import Configuration from './Configuration';
import logger from './Logger';
import axios from 'axios';
import { AdvancedSearchResults } from '../types/results';
import JsonOptions, { loadOptions } from './Options';
import { loadOutput, saveOutput } from './Output';
import Notifications from './Notifications';

export default class Manager {
    private config: Configuration;

    private options!: JsonOptions;

    private notifications!: Notifications;

    private totalResults: number = 0;

    constructor() {
        this.config = new Configuration();
    }

    public start(): void {
        logger.info('Manager initialized')

        this.options = loadOptions();

        if (this.options.discord.webHookUrl != '') {
            this.notifications = new Notifications(this.options.discord.webHookUrl as string);
        }

        //load the total results from the file output.json
        this.totalResults = loadOutput();

        this.startSearch();
        //repeat every 2 hours
        setInterval(this.startSearch.bind(this), 2 * 60 * 60 * 1000);
    }

    private async startSearch(): Promise<void> {
        logger.info('🔄 Manager started searching')

        const organizationLatinName = this.options.advancedSearch.organizationLatinName;

        const organizationId = this.options.advancedSearch.organizationId;

        //if any of the options is not empty then use advanced search
        if (!organizationLatinName && !organizationId) {
            return;
        }

        const optionToUse = organizationId ? organizationId : organizationLatinName;

        let searchQuery = organizationId ? `organizationId:${optionToUse}` : `organizationLatinName:"${optionToUse}"`;

        searchQuery += `AND q:["${this.options.advancedSearch.query}"]`;

        let url = this.config.getApiUrlWithParams('search/advanced', `q=${searchQuery}`);

        url = encodeURI(url);

        const totalResults = await this.runHttpsRequest(url);

        if (totalResults < 0) {
            logger.error('Manager failed to run HTTPS request');

            return;
        }

        logger.info(`✅ Manager finished searching with ${totalResults} results`);

        if (this.totalResults < totalResults) {
            const message = `Found ${totalResults - this.totalResults} new results with the keyword ${this.options.advancedSearch.query}`;

            logger.info('📩' + message)

            if (this.notifications) {
                this.notifications.sendDiscord(message);
            }

            this.totalResults = totalResults;

            //save the total results to the file output.json
            saveOutput({ totalResults: this.totalResults });
        }
    }

    private async runHttpsRequest(url: string): Promise<number> {
        const response = await axios.get(url);

        if (response.status !== 200) {
            logger.error(`Manager failed to run HTTPS request to ${url} with status code ${response.status}`);

            return -1;
        }

        const results: AdvancedSearchResults = response.data;

        return results.info.total;
    }
}
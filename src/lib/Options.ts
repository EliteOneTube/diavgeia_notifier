import * as path from 'path';
import * as fs from 'fs';
import validator from '../tools/validator';
import logger from './Logger';

const defaultOptions: JsonOptions = {
    advancedSearch: {
        organizationLatinName: '',
        organizationId: '',
        query: '',
    },
    discord: {
        webHookUrl: ''
    }
}

export default interface JsonOptions {
    advancedSearch: AdvancedSearch;
    discord: Discord;
}

interface Discord {
    webHookUrl: string;
}

interface AdvancedSearch {
    organizationLatinName: string;
    organizationId: string;
    query: string;
}

export function loadOptions(): JsonOptions {
    const fileLocation = path.resolve(__dirname, getOptionsPath());

    //try to read the file and if it doesnt exist create it using the default options
    try {
        const rawOptions = fs.readFileSync(fileLocation, 'utf8');

        try {
            const options: JsonOptions = JSON.parse(rawOptions);

            const errors = validator(options, 'options');

            if (errors) {
                throw new Error('Invalid options: ' + errors.join(', '));
            }

            return options;
        } catch (err: any) {
            logger.error(err.message);

            //Invalid options, create a new file with the default options
            logger.info ('Re-creating it with default options.')

            fs.writeFileSync(fileLocation, JSON.stringify(defaultOptions, null, 4));

            return defaultOptions;
        }
    } catch (err) {
        logger.info ('🔄 Options file not found, creating it')

        fs.writeFileSync(fileLocation, JSON.stringify(defaultOptions, null, 4));

        return defaultOptions;
    }
}

export function getOptionsPath(): string {
    //options file is in the root of the project
    return '../../options.json';
}
import axios from 'axios';
import logger from './Logger';

export default class Notifications {
    private webhookId: string;
    
    constructor(webhookId: string) {
        this.webhookId = webhookId;
    }

    public async sendDiscord(message: string): Promise<void> {
        const response = await axios.post(this.webhookId, {
            content: message
        });

        if (response.status !== 204 && response.status !== 200) {
            logger.error(`Notifications failed to send message to discord with status code ${response.status}`);
        }
    }
}
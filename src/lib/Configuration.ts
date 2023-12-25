export default class Configuration {
    public static readonly API_BASE_URL: string = 'https://diavgeia.gov.gr/opendata/'

    public getApiBaseUrl(): string {
        return Configuration.API_BASE_URL;
    }

    public getApiUrl(endpoint: string): string {
        return this.getApiBaseUrl() + endpoint;
    }
    
    public getApiUrlWithParams(endpoint: string, params: string): string {
        return this.getApiUrl(endpoint) + '?' + params;
    }
}
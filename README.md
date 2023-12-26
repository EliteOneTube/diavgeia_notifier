# Diavgeia_Notifier

## Description
Are you tired of checking everyday if there is a new decision published on Diavgeia about you or your organization?
Diavgeia_Notifier is a Node.js application that will notify you when a new decision is published on [Diavgeia](https://diavgeia.gov.gr/) depending on your options. Currently, it supports notifications via Discord.

## Options Schema
```
{
    "advancedSearch": {
        "organizationLatinName": "",
        "organizationId": "",
        "query": ""
    },
    "discord": {
        "webhookId": ""
    }
}
```

## Usage
By default the schema will look like this. You can change the values to your liking. You can create the file yourself or it will create it when it starts with the following values (Keep in mind that you will need to edit it to get it started). Will create the file in the same directory as the application.

```
{
    "advancedSearch": {
        "organizationLatinName": "",
        "organizationId": "",
        "query": ""
    },
    "discord": {
        "webhookId": ""
    }
}
```

## Installation

1. Clone the repository.
2. Install the dependencies by running the following command: `npm install`
3. Please install [PM2](https://pm2.keymetrics.io/) globally as it is used to run the application in the background.
4. Run the application with the following command: `npm run start`
5. Live logs can be seen with the following command: `pm2 logs diavgeia_notifier`
6. If you want to stop the application run the following command: `pm2 kill`
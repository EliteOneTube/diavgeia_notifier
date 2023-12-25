import jsonschema from 'jsonschema';

export const optionsSchema: jsonschema.Schema = {
    type: 'object',
    properties: {
        advancedSearch: {
            type: 'object',
            properties: {
                organizationLatinName: {
                    type: 'string'
                },
                organizationId: {
                    type: 'string'
                },
                query: {
                    type: 'string'
                }
            },
        },
        discord: {
            type: 'object',
            properties: {
                webhookId: {
                    type: 'string'
                }
            }
        }
    },
    required: [],
    additionalProperties: false,
};
import jsonschema from 'jsonschema';

export const outputSchema: jsonschema.Schema = {
    type: 'object',
    properties: {
        totalResults: {
            type: 'number'
        }
    },
    required: [],
    additionalProperties: false,
};
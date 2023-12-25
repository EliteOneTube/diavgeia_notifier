import jsonschema from 'jsonschema';
import JsonOptions  from '../lib/Options';

const Validator = jsonschema.Validator;
const v = new Validator();

import { optionsSchema } from '../schemas/options';
import { outputSchema } from '../schemas/output'
import JsonOuput from '../lib/Output';

v.addSchema(optionsSchema);
v.addSchema(outputSchema);

export = function (data: JsonOptions | JsonOuput, schema: string): string[] | null {
    let schemaToValidate;
    switch (schema) {
        case 'options':
            schemaToValidate = optionsSchema;
            break;
        case 'output':
            schemaToValidate = outputSchema;
            break;
        default:
            return null;
    }

    const validated = v.validate(data, schemaToValidate);
    if (validated.valid === true) {
        return null;
    }

    return errorParser(validated);
};

function errorParser(validated: jsonschema.ValidatorResult): string[] {
    const errors: string[] = [];
    for (let i = 0; i < validated.errors.length; i++) {
        const error = validated.errors[i];
        let property = error.property;
        if (property.startsWith('instance.')) {
            property = property.replace('instance.', '');
        } else if (property === 'instance') {
            property = '';
        }

        let message = error.stack;
        if (error.name === 'additionalProperties') {
            message = `unknown property "${error.argument as string}"`;
        } else if (property) {
            if (error.name === 'anyOf') {
                message = `"${property}" does not have a valid value`;
            } else {
                message = message.replace(error.property, `"${property}"`).trim();
            }
        } else {
            message = message.replace(error.property, property).trim();
        }

        errors.push(message);
    }
    return errors;
}
import defaultSchema from 'utility/validation/defaultSchema.js';

function getValidator(props) {
    const { type, validator: validatorName, validationSchema } = props;

    const schema = validationSchema || defaultSchema;

    // try custom
    const schema__custom = schema.custom[validatorName];
    if (validatorName && schema__custom && schema__custom.validator) {
        return schema__custom.validator;
    }

    // try type
    const schema__type = schema.types[type];
    if (schema__type && schema__type.validator) {
        return schema__type.validator;
    }

    return undefined;
}

function getResponses(props) {
    const { required, type, validator: validatorName, validationSchema } = props;

    const schema = validationSchema || defaultSchema;

    const responses = {};

    // default (global) responses
    Object.assign(responses, defaultSchema.responses);

    // types
    const schema__type = schema.types[type];
    if (schema__type && schema__type.responses) {
        Object.assign(responses, schema__type.responses);
    }

    // custom
    if (validatorName) {
        const schema__custom = schema.custom[validatorName];
        if (schema__custom && schema__custom.responses) {
            Object.assign(responses, schema__custom.responses);
        }
    }

    if (required !== true) responses.empty = () => {}; // reset empty message if not "required"

    return responses;
}

export function getSchema(props) {
    return {
        validator: getValidator(props),
        responses: getResponses(props),
    };
}

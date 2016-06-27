import React from 'react';
import { Input_ValidationResponse as Response } from 'utility/components.js';
import Validator from 'utility/validation/validator.js';

const defaultSchema = {
    responses: {
        valid: () => {},
        invalid: () => <Response type="danger">Invalid value.</Response>,
        empty: () => <Response type="warning">This field is required.</Response>,
    },

    // validate some basic input types
    types: {
        email: {
            validator: value => Validator.email(value),
        },
        url: {
            validator: value => Validator.url(value),
        },
        password: {
            validator: value => Validator.password(value),
            responses: {
                tooShort: () => <Response type="danger">Must contain at least eight characters</Response>,
                noNumber: () => <Response type="danger">Must contain at least one number (0-9)</Response>,
                noLowercase: () => <Response type="danger">must contain at least one lowercase letter (a-z)</Response>,
                noUppercase: () => <Response type="danger">must contain at least one uppercase letter (A-Z)</Response>,
                noSymbol: () => <Response type="danger">must contain at least one symbol (!$#& ...)</Response>,
            },
        },
    },


    // Custom validator example
    custom: {
        myValidator: {
            validator: value => {
                if (!value) return null;
                if (value === 'tushar') return 'valid';
                return 'getouttahere';
            },
            responses: {
                valid: () => <Response type="info">That looks good</Response>,
                getouttahere: () => <Response type="warning">Get outta here</Response>,
            },
        },
    },
};

export default defaultSchema;

/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

import React, { Component, PropTypes } from 'react';
import Pod_Styler from 'utility/styler.js';
import PureRender from 'utility/pureRender.js';
import Logger from 'utility/logger.js';
import { getSchema } from 'utility/validation/index.js';

/**
* Input component
*
* @element Input
*
* @param {string} [type=text] - Input type
* @param {string} [value] - Input value
* @param {string} [placeholder] - Placeholder text
* @param {string} [name] - Input name
* @param {boolean} [stateless=false] - Render pure component
* @param {boolean} [required=false] - Field is required. Will show warning if left balnk
* @param (boolean | object) [validate=false] - Enable validate. Optionally pass validation schema as object
*
*/
module.exports = componentName => class Pod_Component extends Component {

    static displayName = componentName;

    constructor(props, context) {
        super(props, context);

        const { stateless, value: valueProp } = props;

        // Get schematics for this Input
        this.schema = getSchema(props);

        if (props.validate !== true && !this.schema.validator) {
            this.shouldValidate = false;
        } else {
            this.shouldValidate = props.validate;
        }

        // Maintain state
        if (!stateless) {
            // make sure value is string or number
            // else set empty string
            const value = (typeof valueProp === 'string' || typeof valueProp === 'number') ? valueProp : '';
            this.state = { value };
        }
    }

    static propTypes = {
        name: PropTypes.string,
        placeholder: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool,
        ]),
        type: PropTypes.oneOf([
            'text',
            'textarea',
            'password',
            'number',
            'email',
            'url',
            'hidden',
            'date',
        ]),
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        stateless: PropTypes.bool,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        required: PropTypes.bool,
        validate: PropTypes.bool,
        primitive: PropTypes.bool,
        validationSchema: PropTypes.object,
        validator: PropTypes.string,
    }

    static defaultProps = {
        value: '',
        primitive: false,
        validate: true,
        required: false,
        stateless: false,
        type: 'text',
    }

    shouldComponentUpdate = PureRender;

    // Determines placeholder text
    // depending on placeholder and value props
    getPlaceholder(value) {
        const { name, placeholder: placeholderProp } = this.props;

        let placeholder = placeholderProp;

        // Boolean - true (props.name becomes placeholder)
        if (placeholderProp === true) placeholder = name;

        // no placeholder if value has characters
        if (value && value.length > 0) placeholder = false;

        return placeholder;
    }

    // Change handler
    // triggers onChange prop with value
    onChange = e => {
        const { stateless, onChange: callback } = this.props;
        const value = e.target.value;

        if (!stateless && this.state.value === value) return; // no Change

        // missing callback on stateless Input. throw warning
        if (!callback && stateless) {
            Logger.warn('<Input> Unable to mutate controlled input. Use onChange callback or remove "stateless" prop.');
            return;
        }

        // Validate
        let validation;
        if (this.state.validation) validation = this.validate(value);

        // Maintain value in state
        if (!stateless) {
            this.setState({ value, validation });
        } else {
            this.setState({ validation });
        }

        // trigger onChange callback
        if (callback) callback({ value, validation });
    }

    onFocus = e => {
        const { onFocus } = this.props;

        // set focus for styling
        this.setState({ focus: true });

        if (onFocus) onFocus(e);
    }

    onBlur = () => {
        const { stateless, name, onChange } = this.props;
        const value = !stateless ? this.state.value : this.props.value;

        // Validate
        const validation = this.validate(value);

        if (!stateless) {
            this.setState({
                value,
                focus: false,
                validation,
            });
        } else {
            this.setState({ focus: false, validation });
        }

        // Trigger onChange callback if passed
        if (onChange) onChange({ value, validation }, name);
    }

    validate(value) {
        const { validator } = this.schema;
        if (validator) return validator(value);
        return {};
    }

    getValidationMessage(validationState = this.state.validation) {
        if (validationState !== undefined) {
            const currentResponse = this.schema.responses[validationState];
            if (currentResponse) return currentResponse();
            // Logger.warn(`[Validation] Missing response for term "${validationState}". %o`, this.props.validationSchema);
        }
        return false;
    }

    render() {
        const style = Pod_Styler.getStyle(this);
        const { validate, stateless, name, type, value: valueProp } = this.props;

        // Decide input tagname based on type
        const InputTag = type === 'textarea' ? 'textarea' : 'input';

        // use state.value if stateful. else use prop
        const value = !stateless ? this.state.value : valueProp;


        const placeholder = this.getPlaceholder(value);
        const validationMessage = this.getValidationMessage();

        return (
            <div style={style.wrapper}>
                <div style={style.main}>

                    {placeholder &&
                        <span style={style.placeholder}>{placeholder}</span>
                    }

                    <InputTag
                        type={type}
                        name={name}
                        ref="input"
                        value={value}
                        style={style.input}

                        onBlur={this.onBlur}
                        onFocus={this.onFocus}
                        onChange={this.onChange}
                    />
                </div>

                {validate && validationMessage}
            </div>
        );
    }
};

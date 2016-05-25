/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

import React, { Component, PropTypes } from 'react';
import { merge as _merge } from 'lodash';
import Pod_Styler from 'utility/styler.js';
import PureRender from 'utility/pureRender.js';
import Logger from 'utility/logger.js';
import { Validator, autoFixURL } from 'utility/InputHelper.js';
import { Input_ValidationResponse } from 'utility/components.js';

/**
* Input component
*
* @element Input
*
* @param {string} [type=text] - Input type
* @param {string} [value] - Input value
* @param {string} [placeholder] - Placeholder text
* @param {string} [name] - Input name
* @param {boolean} [stateful=false] - Should component maintain value in state
* @param {boolean} [required=false] - Field is required. Will show warning if left balnk
* @param (boolean | object) [validate=false] - Enable validate. Optionally pass validation schema as object
* @param {boolean} [primitive=false] - create hidden <input> element. Enable if you need it for form value
*
*/
module.exports = componentName => class Pod_Component extends Component {

    static displayName = componentName;

    constructor(props, context) {
        super(props, context);

        const { stateful, value: valueProp, validationSchema } = props;

        // Merge validation schema
        this.validationSchema = _merge({}, {
            responses: {
                valid: <Input_ValidationResponse valid icon="check_circle">This works.</Input_ValidationResponse>,
                invalid: <Input_ValidationResponse invalid icon="error">Invalid input.</Input_ValidationResponse>,
                empty: <Input_ValidationResponse empty icon="error">This field can not be left empty.</Input_ValidationResponse>,
            },
        }, validationSchema);

        // Maintain state
        if (stateful) {
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
        stateful: PropTypes.bool,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        required: PropTypes.bool,
        validate: PropTypes.bool,
        primitive: PropTypes.bool,
        validationSchema: PropTypes.bool,
    }

    static defaultProps = {
        value: '',
        primitive: false,
        validate: true,
        required: false,
        stateful: false,
        type: 'text',
    }

    shouldComponentUpdate = PureRender;

    componentDidMount() {
        const { pseudoInput } = this.refs;
        if ('oninput' in pseudoInput) { // Modern browsers
            pseudoInput.addEventListener('input', this.onChange);
        } else { // IE. sigh
            pseudoInput.addEventListener('blur', this.onChange);
            pseudoInput.addEventListener('keyup', this.onChange);
            pseudoInput.addEventListener('paste', this.onChange);
            pseudoInput.addEventListener('copy', this.onChange);
            pseudoInput.addEventListener('cut', this.onChange);
            pseudoInput.addEventListener('mouseup', this.onChange);
        }
    }

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
        const { stateful, onChange: callback } = this.props;
        const value = e.target.innerText;

        if (this.state.value === value) return; // no Change

        // missing callback on stateless Input. throw warning
        if (!callback && !stateful) {
            Logger.warn('<Input> Unable to mutate controlled input. Use onChange callback or pass "stateful" prop.');
            return;
        }

        // Validate
        const validation = this.validate(value);
        const isValid = validation === 'valid' || validation === null;

        // Maintain internal state if stateful
        if (stateful) this.setState({ value, isValid });

        // trigger onChange callback
        if (callback) callback({ value, isValid, validation });
    }

    // Validate input value
    // -- returns 'valid', 'invalid', 'empty' or null
    // -- validation response is decided based on those in getValidationMessage()
    validate = value => {
        const { type, required } = this.props;

        // If value is empty
        // -- return 'empty' if required
        // -- else return null (makes sure there's no notice or style change)
        if (value === undefined || value === '') return required ? 'empty' : null;

        switch (type) {

        case 'email': return Validator.email(value) ? 'valid' : 'invalid';

        case 'url': return Validator.url(value) ? 'valid' : 'invalid';

        default: return 'valid';

        }
    }

    onFocus = e => {
        const { onFocus } = this.props;

        // set focus for styling
        this.setState({ focus: true });

        if (onFocus) onFocus(e);
    }

    onBlur = () => {
        const { type, validate, stateful, name, onChange } = this.props;
        const currentValue = stateful ? this.state.value : this.props.value;

        let value = currentValue;

        // autofix missing protocol in URL
        if (type === 'url') value = autoFixURL(currentValue, validate);

        // Validate
        const isValid = this.validate(value);

        if (stateful) {
            this.setState({
                value,
                focus: false,
                isValid,
            });
        } else {
            this.setState({ focus: false });
        }

        // Trigger onChange callback if passed
        if (onChange) onChange({ value, isValid }, name);
    }

    // Get validation response Message
    // based on validation state and schema
    getValidationMessage() {

    }

    render() {
        const style = Pod_Styler.getStyle(this);
        const { primitive, stateful, name, type } = this.props;

        // use state.value if stateful
        const value = stateful ? this.state.value : this.props.value;
        const placeholder = this.getPlaceholder(value);

        // Decide tagname based on type
        const InputTag = type === 'textarea' ? 'textarea' : 'input';

        // Validation response
        const validationMessage = this.getValidationMessage();

        return (
            <div style={style.wrapper}>
                <div style={style.main}>
                    {placeholder &&
                        <span style={style.placeholder}>{placeholder}</span>
                    }

                    <div
                        contentEditable="true"
                        ref="pseudoInput"
                        style={style.pseudoInput}
                        onBlur={this.onBlur}
                        onFocus={this.onFocus}
                        dangerouslySetInnerHTML={{ __html: value }}
                    />
                </div>

                {validationMessage}

                {primitive &&
                    <InputTag
                        type={type}
                        name={name}
                        ref="input"
                        value={value}
                        style={style.input}
                    />
                }
            </div>
        );
    }
};

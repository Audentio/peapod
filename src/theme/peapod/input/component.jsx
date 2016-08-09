/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

import React, { Component, PropTypes } from 'react';
import Styler from 'utility/styler.js';
// import PureRender from 'utility/pureRender.js';
import shallowEqual from 'shallowequal';
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

        // Should input validate?
        // check validate prop and validator function existence
        this.__shouldValidate = this.props.validate === true && !!this.schema.validator;

        // Maintain state
        if (!stateless) {
            // make sure value is string or number
            // else set empty string
            const value = valueProp;
            this.state = { value };
        } else {
            this.state = {};
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
        validate: false,
        required: false,
        stateless: false,
        type: 'text',
        styler: {
            height: '32px',
        },
    }

    // shouldComponentUpdate = PureRender;
    shouldComponentUpdate(nextProps, nextState) {
        const { stateless, value } = nextProps;

        return !shallowEqual(this.state, nextState) || !(stateless && this.props.value === value);
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
        const { stateless, onChange: callback, name } = this.props;
        const value = e.target.value;

        if (!stateless && this.state.value === value) return; // no Change

        // Missing callback on stateless Input. throw warning
        if (!callback && stateless) {
            Logger.warn('<Input> Unable to mutate controlled input. Use onChange callback or remove "stateless" prop.');
            return;
        }

        // Validate new value
        const validation = this.validate(value);

        const newState = { validation };

        // Maintain value in state
        if (!stateless) newState.value = value;

        this.setState(newState);

        // trigger onChange callback
        if (callback) callback({ value, validation, name });
    }

    onFocus = e => {
        const { onFocus } = this.props;

        // set focus for styling
        this.setState({ focus: true });

        if (onFocus) onFocus(e);
    }

    onBlur = () => {
        const { stateless, name, onChange } = this.props;
        const value = stateless ? this.props.value : this.state.value;

        // Validate
        const validation = this.validate(value);

        const newState = { focus: false, validation };

        if (!stateless) newState.value = value;

        this.setState(newState);

        // Trigger onChange callback if passed
        if (onChange) onChange({ value, validation, name });
    }

    validate(value) {
        const { validator } = this.schema;

        if (this.__shouldValidate) return validator(value);

        return null;
    }

    getValidationMessage(validationState = this.state.validation) {
        if (validationState !== null) {
            const currentResponse = this.schema.responses[validationState];
            if (currentResponse) return currentResponse();
            // Logger.warn(`[Validation] Missing response for term "${validationState}". %o`, this.props.validationSchema);
        }
        return false;
    }

    componentWillReceiveProps(nextProps) {
        const { value, stateless } = nextProps;

        // update state if component is stateful
        if (!stateless) this.setState({ value });
    }

    render() {
        const classes = Styler.getClassStyle(this);
        const { validate, stateless, name, type, value: valueProp } = this.props;

        // use value prop if stateless else use state
        const value = stateless ? valueProp : this.state.value;

        // Decide input tagname based on type
        const InputTag = type === 'textarea' ? 'textarea' : 'input';

        const placeholder = this.getPlaceholder(value);
        const validationMessage = this.getValidationMessage();

        // Logger.log('rendered: ', name);

        return (
            <div className={classes.wrapper}>
                <div className={classes.main}>

                    {placeholder && <span className={classes.placeholder}>{placeholder}</span>}

                    <InputTag
                        type={type}
                        name={name}
                        ref="input"
                        // Make sure we pass empty string to render a controlled input in case value is not string/number
                        value={(typeof value === 'string' || typeof value === 'number') ? value : ''}
                        className={classes.input}

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

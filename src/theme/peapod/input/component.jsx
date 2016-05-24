/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


// Dependencies
import React, { PropTypes } from 'react';
import Pod_Styler from 'utility/styler.js';
import { Icon } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';
import shallowEqual from 'shallowequal';
import Pod_Helper from 'utility/helper.js';

/**
* Multipurpose Input component
*
* @element Pod_input
*
* @param {string} [type=text] - Input type
* @param {string} [value] - Input value
* @param {string} [placeholder] - Placeholder text
*
*/
module.exports = function (componentName) {
    return class Pod_Component extends React.Component {

        static displayName = componentName;

        shouldComponentUpdate = PureRender;

        constructor(props, context) {
            super(props, context);

            const { placeholder, charLimit, value } = props;

            const charCounter = (charLimit > 0) ? `${value.length}/${charLimit}` : value.length;

            this.state = {
                value,
                focus: false,
                placeholder: (value && value.length > 1) ? '' : placeholder,
                charCounter,
                evaluation: null, // validation state
            };
        }

        static defaultProps = {
            type: 'text',
            value: '',
            showCounter: true,
            charLimit: 0,

            // validation is disabled by default
            validate: false,
            validationResponse: {
                invalid: 'Invalid input',
                valid: 'Valid',
                empty: 'This field is required',
            },
        }

        static propTypes = {
            type: PropTypes.oneOf([
                'text',
                'textarea',
                'password',
                'email',
                'url',
                'number',
                'hidden',
                'date',
            ]),
            orphan: PropTypes.bool,
            name: PropTypes.string,
            value: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]),
            placeholder: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.bool,
            ]),
            required: PropTypes.bool,
            validate: PropTypes.oneOfType([
                PropTypes.func,
                PropTypes.bool,
            ]),
            icon: PropTypes.string,
            charLimit: PropTypes.number,
            callback: PropTypes.func,
            showCounter: PropTypes.bool,
            validationResponse: PropTypes.object,
            onChange: PropTypes.func,
        }

        submitHandler = (e) => {
            if (!this.props.onSubmit) return;

            const input = e.target;
            if (e.charCode === Pod_Helper.keymap.ENTER) {
                e.preventDefault();
                this.props.onSubmit({
                    value: input.value
                })
            }
        }

        componentWillReceiveProps(nextProps) {
            if (!shallowEqual(this.props, nextProps)) return;
            this.onChangeHandler(nextProps.value, false);
        }

        evaluate = (value) => {
            // If value is empty
            // -- return 'empty' if required
            // -- else return null (makes sure there's no notice or style change)
            if (value === undefined || value === '') return (this.props.required) ? 'empty' : null;

            switch (this.props.type) {
                // Field type: E-mail
                // uses a rather simple regex for validation
            case 'email':
                return (value.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) ? 'valid' : 'invalid';

            // Field type: URL
            // verify a URL
            case 'url':
                var expr = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i // eslint-disable-line
                return (value.match(expr)) ? 'valid' : 'invalid';

            // Regular text type field
            default:
                return 'valid';
            }
        }

        validate = (value = this.state.value) => {
            // no validation required.
            if (this.props.validate === false) return true;

            // Use custom validation function if passed
            // else use predefined evaluation function
            const evaluation = (typeof this.props.validate === 'function') ? this.props.validate(value) : this.evaluate(value);

            this.setState({ evaluation });

            return (evaluation === 'valid' || evaluation === null);
        }

        onChangeHandler = (e, cb = true) => {
            if (e === null) return;
            const value = (typeof e === 'object') ? e.target.value : e;
            const placeholder = (value.length > 0) ? '' : this.props.placeholder;
            const callback = this.props.callback || function () { };
            const charCounter = (this.props.charLimit > 0) ? `${value.length}/${this.props.charLimit}` : value.length;
            let isValid = true;

            // evaluate if evaluated before
            if (this.state.evaluation !== null) {
                isValid = this.validate(value);
            }

            if (cb === true) callback(value);

            if (this.props.onChange) {
                this.props.onChange({
                    value,
                    isValid,
                }, this.props.name);
            }

            this.setState({
                value,
                placeholder,
                charCounter,
            });
        }

        onFocus = () => {
            this.setState({ focus: true });
        }

        onBlur = () => {
            this.setState({ focus: false });

            let isValid = true;

            // autofix missing protocol
            // http is assume
            if (this.props.type === 'url' && // URL type input
                this.props.validate !== false && // validation enabled
                this.state.value && this.state.value.length > 0 &&  // Value is non-empty & has a dot
                this.state.value.match(/(?:[a-z][a-z0-9_]*)(\.)(?:[a-z][a-z0-9_]*)/) && // There's a dot in between
                this.state.value.indexOf('://') === -1 // protocol not defined
            ) {
                const value = `http://${this.state.value.trim()}`;
                this.setState({ value });
                isValid = this.validate(value);
            } else {
                isValid = this.validate();
            }

            if (this.props.onChange) {
                this.props.onChange({
                    value: this.state.value,
                    isValid,
                }, this.props.name);
            }
        }

        render() {
            const style = Pod_Styler.getStyle(this);
            const placeholder = (this.props.placeholder === true) ? this.props.name : this.props.placeholder;

            // Message to show in response box
            const validationResponse = this.props.validationResponse[this.state.evaluation];
            const input_markup = (this.props.type === 'textarea') ?
                <textarea
                    name={this.props.name}
                    onKeyPress={this.submitHandler}
                    style={style.input}
                    value={this.state.value}
                    required={this.props.required}

                    onChange={this.onChangeHandler}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                />
                :
                <input
                    name={this.props.name}
                    onKeyPress={this.submitHandler}
                    type={this.props.type}
                    style={style.input}
                    value={this.state.value}
                    required={this.props.required}
                    autoComplete="off"

                    onChange={this.onChangeHandler}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                />;

            return (
                <div style={style.main}>
                    {this.props.icon &&
                        <Icon style={style.icon}>{this.props.icon}</Icon>
                    }

                    {this.state.placeholder &&
                        <span style={style.placeholder}>{placeholder}</span>
                    }

                    {input_markup}

                    {this.props.type === 'textarea' && this.props.showCounter
                        && <div style={style.charCounter}>{this.state.charCounter} Characters</div>
                    }

                    {(this.state.evaluation !== null) &&
                        <div style={style.evaluation}>{validationResponse}</div>
                    }
                </div>
            );
        }
    };
};

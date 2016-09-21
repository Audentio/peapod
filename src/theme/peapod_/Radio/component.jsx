/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

import React from 'react';
import Styler from 'utility/styler.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    constructor(props, context) {
        super(props, context);

        this.state = {
            checked: props.checked === true,
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    static propTypes = {
        group: React.PropTypes.string.isRequired,
        label: React.PropTypes.string,
        checked: React.PropTypes.bool,
        onChange: React.PropTypes.func,
        children: React.PropTypes.any,
    }

    onChangeHandler(e) {
        if (typeof(this.props.onChange) !== 'undefined') this.props.onChange(e.target.checked);

        const RadiosInGroup = document.getElementsByName(this.props.group);
        if (!window.peapod__radioLoop) {
            window.peapod__radioLoop = true;
            for (let x = 0; x < RadiosInGroup.length; x++) {
                const current = RadiosInGroup[x];
                const evt = new UIEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: true,
                    data: 'tushar',
                });
                current.dispatchEvent(evt);
            }
            window.peapod__radioLoop = false;
        }

        this.setState({ checked: this.refs.input.checked });
    }

    componentWillReceiveProps(nextProps) {
        if (typeof(nextProps.checked) !== 'undefined') {
            this.setState({
                checked: nextProps.checked === true,
            });
        }
    }

    componentWillMount() {
        if (typeof(this.props.onChange) !== 'undefined') this.props.onChange(this.state.checked);
    }

    render() {
        const classes = Styler.getClasses(this);
        return (
            <div ref="main" className={classes.wrapper_outer}>
                <label className={classes.wrapper_inner}>
                    <span className={classes.radio_outer}>
                        <span className={classes.radio_inner}></span>
                        <input ref="input" type="radio" className={classes.radio_element} onChange={this.onChangeHandler} name={this.props.group} {...this.props} />
                    </span>
                    <span className={classes.label} >{this.props.label}</span>
                </label>
            </div>
        );
    }
};

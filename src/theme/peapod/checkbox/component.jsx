/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


import React from 'react';
import Styler from 'utility/styler.js';
import { Icon } from 'utility/components.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    constructor(props, context) {
        super(props, context);

        this.state = {
            checked: props.checked === true,
        };
    }

    static propTypes = {
        children: React.PropTypes.any,
        icon: React.PropTypes.string,
        onChange: React.PropTypes.func,
        name: React.PropTypes.string,
        label: React.PropTypes.string,
        checked: React.PropTypes.bool,
    }

    onChangeHandler = (e) => {
        const value = (e.target.checked) ? 1 : 0;
        if (typeof this.props.onChange !== 'undefined') this.props.onChange({ value }, this.props.name);

        this.setChecked(e.target.checked);
    }

    setChecked(state) {
        this.setState({
            checked: state,
        });
    }

    static defaultProps = {
        setChecked: () => {
            this.setChecked(true);
        },
        setUnchecked: () => {
            this.setChecked(false);
        },
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
        const icon = (this.props.icon) ?
            <Icon styler={{ style: classes.style.icon }}>{this.props.icon}</Icon> :
            <Icon styler={{ style: classes.style.icon }}>check</Icon>;

        return (
            <div className={classes.main}>
                <label className={classes.wrapper}>
                    <span className={classes.box}>
                        <input name={this.props.name} className={classes.input} onChange={this.onChangeHandler} type="checkbox" checked={this.state.checked} />
                        <span className={classes.innerBox}></span>
                        {icon}
                    </span>
                    <span className={classes.label} >{this.props.label}</span>
                </label>
            </div>
        );
    }
};

/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

import React, { PropTypes, Component } from 'react';
import Styler from 'utility/styler.js';
import { Button, Menu, Icon } from 'utility/components.js';

/* SELECT component */

module.exports = componentName => class Pod_Component extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            open: false,
        };
    }

    static displayName = componentName;

    static propTypes = {
        children: PropTypes.any,
    }

    // Change option
    // re-creates and re-renders menu
    change = (value, displayValue) => {
        this.setState({
            menu: this.createOptions({ value }), // re-create options to reflect selected value
            value,
            displayValue,
            open: false,
        });
    }

    createOptions(current = {}) {
        const options = [];
        const style = Styler.getStyle(this);

        this.props.children.forEach(item => {
            const { children, value } = item.props;
            const optionStyle = (value === current.value) ? Object.assign({}, style.option, style.optionSelected) : {};

            options.unshift({
                text: children,
                props: {
                    styler: { style: optionStyle },
                    value,
                    onClick: () => {
                        this.change(value, children);
                    },
                },
            });
        });

        return options;
    }

    createMenu() {
        const { children } = this.props;

        // Find and remember selected value
        // -- for loop so we can break out of it
        for (let x = 0; x < children.length; x++) {
            const child = children[x];
            if (child.props.selected) {
                this.state.value = child.props.value;
                this.state.displayValue = child.props.children;
                break;
            }
        }

        const menu = this.createOptions({ value: this.state.value });

        this.setState({ menu });
    }

    componentWillMount() {
        this.createMenu();
    }

    componentDidMount() {
        this.refs.main.addEventListener('mouseenter', () => {
            this.setState({ isHovered: true });
        });
        this.refs.main.addEventListener('mouseleave', () => {
            this.setState({ isHovered: false });
        });
    }

    componentWillReceiveProps() {
        this.createMenu();
    }

    toggle = () => {
        this.setState({ open: !this.state.open });
    }

    render() {
        const classes = Styler.getClassStyle(this);
        const { menu, open, displayValue } = this.state;

        const trigger = (
            <div className={classes.trigger} onClick={this.toggle}>
                {displayValue}
                <Icon style={classes.style.triggerIcon}>{open ? 'arrow_drop_up' : 'arrow_drop_down'}</Icon>
            </div>
        );

        return (
            <div className={classes.main} ref="main">
                {trigger}
                {open && <Menu styler={{ style: classes.style.menu }} json={menu} />}
            </div>
        );
    }
};

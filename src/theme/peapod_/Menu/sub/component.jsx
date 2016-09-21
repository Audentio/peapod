import React from 'react';
import Styler from 'utility/styler.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;
    constructor() {
        super();

        this.state = {
            show: false,
        };
    }

    mouseEnter() {
        this.setState({ show: true });
    }
    mouseLeave() {
        this.setState({ show: false });
    }

    render() {
        const classes = Styler.getClasses(this);
        const children = (this.state.show) ? this.props.children : '';

        return (
            <div
                onMouseEnter={this.mouseEnter.bind(this)}
                onMouseLeave={this.mouseLeave.bind(this)}
            >
                {this.props.trigger}
                <div className={classes.main}>
                    {children}
                </div>
            </div>
        );
    }
};

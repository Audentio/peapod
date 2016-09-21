import React from 'react';
import Styler from 'utility/styler.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    static propTypes = {
        children: React.PropTypes.any,
        onClick: React.PropTypes.func,
    }

    render() {
        const classes = Styler.getClasses(this);

        return (
            <div onClick={this.props.onClick} className={classes.main}>
                {this.props.children}
            </div>
        );
    }

};

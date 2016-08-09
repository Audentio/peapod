import React from 'react';
import Styler from 'utility/styler.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    static propTypes = {
        children: React.PropTypes.any,
    }

    render() {
        const classes = Styler.getClasses(this);

        return (
            <div className={classes.main}>
                {this.props.children}
            </div>
        );
    }

};

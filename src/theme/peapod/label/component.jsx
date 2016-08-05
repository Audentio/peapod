import React from 'react';
import Pod_Styler from 'utility/styler.js';

import { Icon } from 'utility/components.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    static propTypes = {
        children: React.PropTypes.any,
        icon: React.PropTypes.any,
    }

    render() {
        const classes = Pod_Styler.getClassStyle(this);

        const icon = (typeof(this.props.icon) !== 'undefined' && this.props.icon.length) ? <Icon styler={{ style: classes.style.icon }}>{this.props.icon}</Icon> : null;

        return (
            <div className={classes.main}>
                {icon} {this.props.children}
            </div>
        );
    }
};

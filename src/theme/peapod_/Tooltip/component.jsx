/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React from 'react';
import Styler from 'utility/styler.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    static propTypes = {
        children: React.PropTypes.any,
        show: React.PropTypes.bool,
        hovering: React.PropTypes.bool,
        arrow: React.PropTypes.bool,
    }

    static defaultProps = {
        show: false,
        hovering: false, // to add
        arrow: false, // to add
    }

    componentWillMount() {
        const { show, hovering } = this.props;
        this.state = { show, hovering };
    }

    componentWillReceiveProps(nextProps) {
        const { show, hovering } = nextProps;
        this.setState({ show, hovering });
    }

    render() {
        const classes = Styler.getClasses(this);

        const tooltip = (this.props.show) ? (
            <div className={classes.tooltip}>
                <div className={classes.arrow}></div>
                <div>{this.props.children}</div>
            </div>
        ) : '';

        return (
            <div className={classes.main}>
                {tooltip}
            </div>
        );
    }
};

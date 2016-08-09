/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

import React from 'react';
import Styler from 'utility/styler.js';
import { Heading } from 'utility/components.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    static propTypes = {
        children: React.PropTypes.any,
        actionBar: React.PropTypes.any,
        actionBarLocation: React.PropTypes.string,
        title: React.PropTypes.oneOfType([
            React.PropTypes.bool,
            React.PropTypes.string,
        ]),
    }

    static defaultProps = {
        title: false,
        actionBar: false,
        actionBarLocation: 'bottom',
    }

    render() {
        const classes = Styler.getClassStyle(this);

        const objectCheck = new Object(this.props);

        const titleElement = (typeof objectCheck.title === 'string') ?
        (<Heading kind="h4" styler={{ secondary: true }}>{this.props.title}</Heading>) :
        objectCheck.title;

        const title = (objectCheck.title) ? (
            <div className={classes.title}>
                {titleElement}
            </div>
        ) : '';

        let actionBar = (objectCheck.actionBar) ? (
            <div className={classes.actionBar}>
                {this.props.actionBar}
            </div>
        ) : '';

        let actionBarTop = '';
        if (this.props.actionBarLocation !== 'bottom') {
            actionBarTop = actionBar;
            actionBar = '';
        }

        return (
            <div className={classes.main} {...this.props}>
                {actionBarTop}
                {title}

                <div className={classes.content}>{this.props.children}</div>

                {actionBar}
            </div>
        );
    }

};

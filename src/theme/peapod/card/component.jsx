/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


// Dependencies
import React from 'react';
import Pod_Styler from 'utility/styler.js';
import { Heading } from 'utility/components.js';

/**
* Card component
* @element Code
*/
module.exports = componentName => class Pod_Component extends React.Component {


    static displayName = componentName;

    static propTypes = {
        children: React.PropTypes.any,
        actionBar: React.PropTypes.any,
        actionBarLocation: React.PropTypes.string,
        title: React.PropTypes.string,
    }

    static defaultProps = {
        title: false,
        actionBar: false,
        actionBarLocation: 'bottom',
    }

    render() {
        const style = Pod_Styler.getStyle(this);

        const objectCheck = new Object(this.props);

        const titleElement = (typeof objectCheck.title === 'string') ?
        (<Heading kind="h4" styler={{ secondary: true }}>{this.props.title}</Heading>) :
        objectCheck.title;

        const title = (objectCheck.title) ? (
            <div style={style.title}>
                {titleElement}
            </div>
        ) : '';

        let actionBar = (objectCheck.actionBar) ? (
            <div style={style.actionBar}>
                {this.props.actionBar}
            </div>
        ) : '';

        let actionBarTop = '';
        if (this.props.actionBarLocation !== 'bottom') {
            actionBarTop = actionBar;
            actionBar = '';
        }

        return (
            <div style={style.main} {...this.props}>
                {actionBarTop}
                {title}

                <div style={style.content}>{this.props.children}</div>

                {actionBar}
            </div>
        );
    }

};

/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

import React from 'react';
import Pod_Styler from 'utility/styler.js';
import { Anchor } from 'utility/components.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    // Validate props
    static propTypes = {
        children: React.PropTypes.any,
    }

    render() {
        const classes = Pod_Styler.getClassStyle(this);

        let children = this.props.children;

        if (typeof children === 'string') {
            children = children.split('/');
        }

        const breadcrumbshtml = [];
        for (let i = 0; i < children.length; i++) {
            const seperator = (i + 1 !== children.length) ? '/' : '';
            breadcrumbshtml.push(
                <li key={i} style={{ display: 'inline' }}>
                    <Anchor styler={{ style: classes.style.listitem }}>{children[i]}</Anchor>
                    {seperator}
                </li>
            );
        }

        return (
            <ul className={classes.main}>
                {breadcrumbshtml}
            </ul>
        );
    }

};

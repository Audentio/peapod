/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


// Dependencies
import React from 'react';
import Pod_Styler from 'utility/styler.js';
import { Anchor } from 'utility/components.js';

/**
* Breadcrumbs component
* @element Code
*/
module.exports = function (componentName) {
    return class Pod_Component extends React.Component {

        static displayName = componentName;

        render() {
            var style = Pod_Styler.getStyle(this);

            var children = this.props.children;

            if (typeof children == "string") {
                children = this.props.childer.split('/')
            }

            var breadcrumbshtml = [];
            for (var i = 0; i < children.length; i++) {
                var seperator = (i + 1 != children.length) ? '/' : '';
                breadcrumbshtml.push(
                    <li key={i} style={{display: 'inline'}}>
                        <Anchor styler={{style: style.listitem}}>{children[i]}</Anchor>
                        {seperator}
                    </li>
                )
            }

            return (
                <ul style={style.main}>
                    {breadcrumbshtml}
                </ul>
            );

        }

    };
};

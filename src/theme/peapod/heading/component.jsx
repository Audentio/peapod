/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


// Dependencies
import React from 'react';
import Pod_Styler from 'utility/styler.js';


/**
* Template component
*
* @element Pod_template
*
*/
module.exports = function (componentName) {
    return class Pod_Component extends React.Component {

        static displayName = componentName;

        static defaultProps = {
            kind: 'h1'
        }

        render() {
            const style = Pod_Styler.getStyle(this);

            const tagname = this.props.kind;

            return React.createElement(
                tagname,
                { style: style[tagname] },
                this.props.children
            )
        }
    };
};

/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React from 'react';
import Pod_Styler from 'utility/styler.js';

module.exports = function (componentName) {
    return class Pod_Component extends React.Component {

        static displayName = componentName;
        render() {
            var {styler, children, ...other} = this.props,
            style = Pod_Styler.getStyle(this);

            return (
                <mark {...other} style={style.main}>
                    {this.props.children}
                </mark>
            );
        }
    };
};

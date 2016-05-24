/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


// Dependencies
import React from 'react';
import Pod_Styler from 'utility/styler.js';

/**
* Block component
* @element Code
*/
module.exports = function (componentName) {
    return class Pod_Component extends React.Component {

        static displayName = componentName;

        render() {
            var style = Pod_Styler.getStyle(this);

            return (
                <div style={style.main}>
                    {this.props.children}
                </div>
            );
        }
    };
};

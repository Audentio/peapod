/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React from 'react';
import Pod_Styler from 'utility/styler.js';
import PureRender from 'utility/pureRender.js';

module.exports = function (componentName) {
    return class Pod_Component extends React.Component {

        static displayName = componentName;

        //shouldComponentUpdate = PureRender;

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

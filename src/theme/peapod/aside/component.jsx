/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React from 'react';
import Pod_Styler from 'styler.js';

module.exports = class Aside extends React.Component {
    render() {
        const { styler, children, ...other } = this.props;
        const style = Pod_Styler.getStyle(this);

        return (
            <aside {...other} style={style.main}>
                {this.props.children}
            </aside>
        );
    }

};

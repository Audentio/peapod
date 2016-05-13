/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


//Dependencies
import React from 'react';
import Pod_Styler from 'styler.js';

/**
* Template component
*
* @element Pod_modal
*
*/
module.exports = class Toolbar extends React.Component {

    constructor() {
        super();
    }

    render() {
        var style = Pod_Styler.getStyle(this);

        return (
            <div style={style.main}>
                {this.props.children}
            </div>
        );

    }

};
/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

// Dependencies
import React from 'react';
import Pod_Styler from 'utility/styler.js';

/**
* BlockQuote component
* @element Code
*/
module.exports = class BlockQuote extends React.Component {

    render() {
        var style = Pod_Styler.getStyle(this);

        return (
            <blockquote style={style.main}>
                {this.props.children}
            </blockquote>
        );

    }

};

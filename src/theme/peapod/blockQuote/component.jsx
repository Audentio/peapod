/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

//Dependencies
import React from 'react';
import Pod_Styler from 'styler.js';
import Wrapper from 'wrapper.jsx';

/**
* BlockQuote component
* @element Code
*/
class BlockQuote extends React.Component {

    render() {
        var style = Pod_Styler.getStyle(this);

        return (
            <blockquote style={style.main}>
                {this.props.children}
            </blockquote>
        );

    }

};

module.exports = Wrapper(BlockQuote);

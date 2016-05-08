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
* Template component
*
* @element Pod_template
*
*/
class Heading extends React.Component {

    render() {
        var style = Pod_Styler.getStyle(this);

        var tagname = this.props.kind;

        return React.createElement(
            tagname,
            {style: style[tagname]},
            this.props.children
        )
    }

};

Heading.defaultProps = {
    kind: 'h1'
};

module.exports = Wrapper(Heading);

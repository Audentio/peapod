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
module.exports = class Heading extends React.Component {
	static defaultProps = {
		kind: 'h1'
	}

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

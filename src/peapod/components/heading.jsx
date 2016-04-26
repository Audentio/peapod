/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


//Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

var Pod_Styler = require('../styler.jsx');
var Wrapper = require('../wrapper.jsx')


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

        return React.createElement(tagname, {style: style[tagname]}, this.props.children)

    }

};

module.exports = Wrapper(Heading);

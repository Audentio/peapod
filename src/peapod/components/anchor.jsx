/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


//Dependencies
import React from 'react';
import ReactaDOM from 'react-dom';
// import { Link } from 'react-router'

var Pod_Styler = require('../styler.js');
var Wrapper = require('../wrapper.jsx')

/**
* Anchor component
* @element Code
*/
class Anchor extends React.Component {

    defaultProps: {
        internal: false
    }

    // regex for internal ?

    render() {
        var style = Pod_Styler.getStyle(this);

        if (this.props.internal) {
            return(<Link to={this.props.to} style={style.main}>{this.props.children}</Link>)
        }
        else {
            return (<a style={style.main} href={this.props.to}>{this.props.children}</a>);
        }

    }

};

module.exports = Wrapper(Anchor);

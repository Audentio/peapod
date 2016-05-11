/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


//Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router'

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

    render() {
        var style = Pod_Styler.getStyle(this);

        var regex = /^(https?:\/\/|ftp:\/\/)/g;
        if (regex.test(this.props.to) && !this.props.internal) {
            return (<a style={style.main} href={this.props.href}>{this.props.children}</a>);
        }
        else {
            // dont ask me why the to value needs to be this way :L
            return(<Link to={`${this.props.href}`} style={style.main}>{this.props.children}</Link>)
        }

    }

};

module.exports = Wrapper(Anchor);

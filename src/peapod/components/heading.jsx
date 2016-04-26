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

        switch(tagname){
            case "h1":
                return (<h1 style={style.h1}>{this.props.text}</h1>);
            case "h2":
                return (<h2 style={style.h2}>{this.props.text}</h2>);
            case "h3":
                return (<h3 style={style.h3}>{this.props.text}</h3>);
            case "h4":
                return (<h4 style={style.h4}>{this.props.text}</h4>);
            case "h5":
                return (<h5 style={style.h5}>{this.props.text}</h5>);
            case "h6":
                return (<h6 style={style.h6}>{this.props.text}</h6>);
            default:
                return (<h1 style={style.main.h1}>{this.props.text}</h1>);
        }

    }

};

module.exports = Wrapper(Heading);

/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


//Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

var Pod_Styler = require('../styler.js');
var Wrapper = require('../wrapper.jsx')

/**
* Parallax component
* @element Code
*/
class Parallax extends React.Component {

    constructor() {
        super();

        this.onScroll = this.onScroll.bind(this);
        document.addEventListener("scroll", this.onScroll, false);
    }

    onScroll(event) {
        var element = this.refs.Parallax
        var elementOnScreen = window.scrollY - (element.offsetTop - window.innerHeight)
        element.scrollTop = elementOnScreen * 0.5
    }

    render() {
        var style = Pod_Styler.getStyle(this);

        return (
            <div style={style.main} onScroll={this.onScroll} ref="Parallax">
                <div style={style.back}>{this.props.background}</div>
                <div style={style.front}>{this.props.children}</div>
            </div>
        );

    }

};

module.exports = Wrapper(Parallax);

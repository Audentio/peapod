/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


//Dependencies
import React from 'react';
import ReactaDOM from 'react-dom';

var Pod_Styler = require('../styler.js');
var Wrapper = require('../wrapper.jsx')

/**
* Blockquote component
* @element Code
*/
class Blockquote extends React.Component {

    render() {
        var style = Pod_Styler.getStyle(this);

        return (
            <blockquote style={style.main}>
                {this.props.children}
            </blockquote>
        );

    }

};

module.exports = Wrapper(Blockquote);

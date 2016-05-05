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
* Embed component
* @element Code
*/
class Embed extends React.Component {

    render() {
        this.style = Pod_Styler.getStyle(this);

        return (
            <iframe
                style={this.style.main}
                src={this.props.src}
                frameborder="0"
                allowfullscreen
            >
            </iframe>
        );

    }

};

module.exports = Wrapper(Embed);

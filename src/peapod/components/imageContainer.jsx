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
* ImageContainer component
* @element Code
*/
class ImageContainer extends React.Component {

    render() {
        var style = Pod_Styler.getStyle(this);

        return (
            <div style={style.main}>
                <div style={style.innerscreen}>
                    {this.props.children}
                </div>
            </div>
        );

    }

};

module.exports = Wrapper(ImageContainer);

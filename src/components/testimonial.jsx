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
* Testimonial component
* @element Code
*/
class Testimonial extends React.Component {

    render() {
        var style = Pod_Styler.getStyle(this);

        var image = (this.props.img) ? (
            <Pod.photo styler={{mainStyle: style.photo, imageStyle: style.photo }} src={this.props.img} />
        ) : '';

        var company = (this.props.img) ? (
            <Pod.anchor to={this.props.link}>{this.props.comp}</Pod.anchor>
        ) : (
            <div>{this.props.comp}</div>
        );

        var name = (this.props.name) ? (<div>{this.props.name}</div>) : '';

        return (
            <div style={style.main}>
                {image}
                <Pod.blockQuote styler={{mainStyle: style.blockQuote}}>{this.props.children}</Pod.blockQuote>
                {name}
                {company}
            </div>
        );

    }

};

module.exports = Wrapper(Testimonial);

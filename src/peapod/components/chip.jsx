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
* Card component
* @element Code
*/
class Chip extends React.Component {

    render() {
        var style = Pod_Styler.getStyle(this);

        var del = (this.props.del) ? (
            <Pod.icon styler={{style: style.del}}>close</Pod.icon>
        ) : '';
        var photo = (this.props.photo) ? (
            <img src={this.props.photo} style={style.photo}/>
        ) : '';

        return (
            <div style={style.main}>
                {photo}
                {del}
                {this.props.children}
            </div>
        );

    }

};


Chip.defaultProps = {
    del: false,
    photo: false
};

module.exports = Wrapper(Chip);

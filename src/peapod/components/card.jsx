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
class Card extends React.Component {

    render() {
        var style = Pod_Styler.getStyle(this);

        var objectCheck = new Object(this.props);

        var title = (objectCheck.title) ? (
            <div style={style.title}>
                <Pod.heading kind="h4">{this.props.title}</Pod.heading>
            </div>
        ) : '';

        var actionBar = (objectCheck.actionBar) ? (
            <div style={style.actionBar}>
                {this.props.actionBar}
            </div>
        ) : '';

        return (
            <div style={style.main}>
                {title}

                <div style={style.content}>{this.props.children}</div>

                {actionBar}
            </div>
        );

    }

};

Card.defaultProps = {
    title: false,
    actionBar: false,
    actionBarLocation: 'bottom'
};

module.exports = Wrapper(Card);

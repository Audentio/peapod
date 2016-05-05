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
* Card component
* @element Code
*/
class Card extends React.Component {

    render() {
        var style = Pod_Styler.getStyle(this);

        var objectCheck = new Object(this.props);

        var titleElement = (typeof objectCheck.title === "string") ?
            (<Pod.heading kind="h4" styler={{secondary:true}}>{this.props.title}</Pod.heading>) :
            objectCheck.title;

        var title = (objectCheck.title) ? (
            <div style={style.title}>
                {titleElement}
            </div>
        ) : '';

        var actionBar = (objectCheck.actionBar) ? (
            <div style={style.actionBar}>
                {this.props.actionBar}
            </div>
        ) : '';

        var actionBarTop = '';
        if (this.props.actionBarLocation != 'bottom') {
            actionBarTop = actionBar;
            actionBar = '';
        }

        return (
            <div style={style.main}>
                {actionBarTop}
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

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
class CardSection extends React.Component {

    render() {
        var style = Pod_Styler.getStyle(this);

        var mediaTitle = (this.props.mediaTitle) ? (
            <div style={style.mediaTitle}>
                {this.props.mediaTitle}
            </div>
        ) : '';

        return (
            <div style={style.main}>
                {this.props.children}
                {mediaTitle}
            </div>
        );

    }

};

CardSection.defaultProps = {
    mediaTitle: false
};

module.exports = Wrapper(CardSection);

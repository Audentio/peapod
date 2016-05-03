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
* Template component
*
* @element Pod_modal
*
*/
class Toolbar extends React.Component {

    constructor() {
        super();
    }

    render() {
        var style = Pod_Styler.getStyle(this);

        return (
            <div style={style.main}>
                {this.props.children}
            </div>
        );

    }

};

module.exports = Wrapper(Toolbar);

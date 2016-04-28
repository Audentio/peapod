/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


//Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

var Pod_Styler = require('../styler.jsx');
var Wrapper = require('../wrapper.jsx')


/**
* Template component
*
* @element Pod_modal
*
*/
class Overlay extends React.Component {

    render() {
        var style = Pod_Styler.getStyle(this);
        return (
            <div style={style.main}>
                <Pod.center>
                    {this.props.children}
                </Pod.center>
            </div>
        );

    }

};

module.exports = Wrapper(Overlay);

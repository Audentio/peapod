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
* BlockRight component
* @element Code
*/
class BlockRight extends React.Component {

    render() {
        var style = Pod_Styler.getStyle(this);

        return (
            <Pod.block {...this.props} align="right">
                {this.props.children}
            </Pod.block>
        );

    }

};

module.exports = Wrapper(BlockRight);
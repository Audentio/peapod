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
* BlockLeft component
* @element Code
*/
class BlockLeft extends React.Component {

    render() {
        var style = Pod_Styler.getStyle(this);

        return (
            <Pod.block align="left">
                {this.props.children}
            </Pod.block>
        );

    }

};

module.exports = Wrapper(BlockLeft);

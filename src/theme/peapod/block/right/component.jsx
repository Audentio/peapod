/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


//Dependencies
import React from 'react';
import Pod_Styler from 'styler.js';
import Wrapper from 'wrapper.jsx';

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

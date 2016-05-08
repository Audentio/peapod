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
* Block_Left component
* @element Code
*/
class Block_Left extends React.Component {

    render() {
        var style = Pod_Styler.getStyle(this);

        return (
            <Pod.block {...this.props} align="left">
                {this.props.children}
            </Pod.block>
        );

    }

};

module.exports = Wrapper(Block_Left);

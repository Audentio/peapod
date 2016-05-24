/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


// Dependencies
import React from 'react';
import { Block } from 'utility/components.js';

/**
* Block_Left component
* @element Code
*/
module.exports = class Block_Left extends React.Component {

    static propType = {
        children: React.PropTypes.any,
    }

    render() {
        return (
            <Block {...this.props} align="left">
                {this.props.children}
            </Block>
        );
    }

};

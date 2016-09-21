/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

import React from 'react';
import { Block } from 'utility/components.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    static propTypes = {
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

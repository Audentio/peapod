/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

import React from 'react';
import Pod_Styler from 'styler.js';

/**
* Modal component
*
* @element Pod_modal
*
*/
module.exports = class Toolbar extends React.Component {

    static propTypes = {
        children: React.PropTypes.node,
    }

    render() {
        const style = Pod_Styler.getStyle(this);

        return (
            <div style={style.main}>
                {this.props.children}
            </div>
        );
    }

};

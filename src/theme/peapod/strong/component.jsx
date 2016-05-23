/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


import React, { Component, PropTypes } from 'react';
import Pod_Styler from 'styler.js';


/**
* @element Strong
*
*/
module.exports = class Strong extends Component {

    static propTypes = {
        children: PropTypes.any,
    }

    render() {
        const style = Pod_Styler.getStyle(this);

        return (
            <strong style={[style.main, { fontWeight: 'bold' }]}>
                {this.props.children}
            </strong>
        );
    }

};

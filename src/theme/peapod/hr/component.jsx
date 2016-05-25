/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

import React, { Component } from 'react';
import Pod_Styler from 'utility/styler.js';

/**
* HR component
*
* @element Pod_hr
*
*/
module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    render() {
        const style = Pod_Styler.getStyle(this);

        return (
            <hr style={style.main} />
        );
    }
};

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
module.exports = class Hr extends Component {

    render() {
        const style = Pod_Styler.getStyle(this);

        return (
            <hr style={style.main} />
        );
    }

};

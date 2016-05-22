/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

import React, { PropTypes } from 'react';
import Pod_Styler from 'styler.js';

/**
* Code component
* @element Code
*/
module.exports = class Code extends React.Component {

    static propTypes = {
        children: PropTypes.string,
    }

    render() {
        const style = Pod_Styler.getStyle(this);
        const { children: code } = this.props;

        return (
            <code style={style.main}>
                {code}
            </code>
        );
    }

};

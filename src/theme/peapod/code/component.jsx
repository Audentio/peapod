/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

import React, { PropTypes } from 'react';
import Pod_Styler from 'utility/styler.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    static propTypes = {
        children: PropTypes.any,
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

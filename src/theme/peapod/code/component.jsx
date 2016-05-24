/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

import React, { PropTypes } from 'react';
import Pod_Styler from 'utility/styler.js';

/**
* Code component
* @element Code
*/
module.exports = function (componentName) {
    return class Pod_Component extends React.Component {

        static displayName = componentName;

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
};

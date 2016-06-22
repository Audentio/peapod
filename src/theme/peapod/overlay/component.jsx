/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

import React from 'react';
import Pod_Styler from 'utility/styler.js';
import Pod from 'utility/components.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    static propTypes = {
        children: React.PropTypes.any,
    }

    render() {
        const style = Pod_Styler.getStyle(this);
        return (
            <div style={style.main}>
                <Pod.Center>
                    {this.props.children}
                </Pod.Center>
            </div>
        );
    }
};

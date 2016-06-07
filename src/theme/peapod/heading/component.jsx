/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

import React from 'react';
import Pod_Styler from 'utility/styler.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    static propTypes = {
        children: React.PropTypes.any,
        kind: React.PropTypes.string,
    }

    static defaultProps = {
        kind: 'h1',
    }

    render() {
        const style = Pod_Styler.getStyle(this);

        const tagname = this.props.kind;

        return React.createElement(
            tagname,
            { style: Object.assign({}, style.main, style[tagname]) },
            this.props.children
        );
    }
};

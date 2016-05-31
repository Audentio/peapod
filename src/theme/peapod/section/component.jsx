/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React from 'react';
import Pod_Styler from 'utility/styler.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    static propTypes = {
        children: React.PropTypes.any,
        varSet: React.PropTypes.any,
    }

    render() {
        const style = Pod_Styler.getStyle(this);

        return (
            <section varSet={this.props.varSet} style={style.main}>
                {this.props.children}
            </section>
        );
    }
};

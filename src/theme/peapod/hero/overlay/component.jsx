/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


// Dependencies
import React from 'react';
import Pod_Styler from 'utility/styler.js';


/**
* Template component
*
* @element Pod_modal
*
*/
module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    static defaultProps = {
        position: 'center',
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

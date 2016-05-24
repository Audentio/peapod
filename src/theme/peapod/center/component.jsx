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
        align: 'center',
        valign: 'middle',
    };

    render() {
        const style = Pod_Styler.getStyle(this);

        return (
            <div style={style.main}>
                <div style={style.outer}>
                    <div style={style.inner}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }

};

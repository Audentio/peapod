/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


//Dependencies
import React from 'react';
import Pod_Styler from 'styler.js';


/**
* Template component
*
* @element Pod_modal
*
*/
module.exports = class Center extends React.Component {

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

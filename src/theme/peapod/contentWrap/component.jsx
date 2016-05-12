/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


//Dependencies
import React from 'react';
import Pod_Styler from 'styler.js';

/**
* ContentWrap component
* @element Code
*/
module.exports = class ContentWrap extends React.Component {

    render() {
        var style = Pod_Styler.getStyle(this);

        return(
            <div style={style.main}>
                {this.props.children}
            </div>
        )

    }

};

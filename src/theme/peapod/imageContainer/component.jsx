/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


// Dependencies
import React from 'react';
import Pod_Styler from 'utility/styler.js';

/**
* ImageContainer component
* @element Code
*/
module.exports = class ImageContainer extends React.Component {

    render() {
        var style = Pod_Styler.getStyle(this);

        return (
            <div style={style.main}>
                <div style={style.background}></div>
                <div style={style.innerscreen}>
                    {this.props.children}
                </div>
            </div>
        );

    }

};

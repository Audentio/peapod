/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


// Dependencies
import React from 'react';
import Pod_Styler from 'utility/styler.js';

/**
* Embed component
* @element Code
*/
module.exports = class Embed extends React.Component {

    render() {
        this.style = Pod_Styler.getStyle(this);

        return (
            <iframe
                style={this.style.main}
                src={this.props.src}
                frameborder="0"
                allowfullscreen
            >
            </iframe>
        );

    }

};

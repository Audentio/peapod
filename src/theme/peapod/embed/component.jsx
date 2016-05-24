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
module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

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

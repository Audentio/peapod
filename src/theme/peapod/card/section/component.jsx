/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


// Dependencies
import React from 'react';
import Pod_Styler from 'utility/styler.js';

/**
* Card component
* @element Code
*/
module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    static defaultProps = {
        mediaTitle: false
    };


    render() {
        var style = Pod_Styler.getStyle(this);

        var mediaTitle = (this.props.mediaTitle) ? (
            <div style={style.mediaTitle}>
                {this.props.mediaTitle}
            </div>
        ) : '';

        return (
            <div style={style.main}>
                {this.props.children}
                {mediaTitle}
            </div>
        );
    }

};

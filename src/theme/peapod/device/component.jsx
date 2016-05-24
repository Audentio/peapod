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
module.exports = componentName => class Pod_Component extends React.Component {


    static displayName = componentName;

    render() {
        const style = Pod_Styler.getStyle(this);

        const overlay = (this.props.overlay) ? (<div style={style.overlay}></div>) : '';

        return (
            <div style={style.main}>
                <div style={style.background}></div>
                <div style={style.innerscreen}>
                    {overlay}
                    <div style={style.scrollable}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
};

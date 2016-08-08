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

    static propTypes = {
        children: React.PropTypes.any,
        overlay: React.PropTypes.bool,
    }


    render() {
        const classes = Pod_Styler.getClassStyle(this);

        const overlay = (this.props.overlay) ? (<div className={classes.overlay}></div>) : '';

        return (
            <div className={classes.main}>
                <div className={classes.background}></div>
                <div className={classes.innerscreen}>
                    {overlay}
                    <div className={classes.scrollable}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
};

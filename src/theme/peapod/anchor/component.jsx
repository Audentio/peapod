/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


// Dependencies
// import { Link } from 'react-router'
import React from 'react';
import Pod_Styler from 'utility/styler.js';

/**
* Anchor component
* @element Code
*/
module.exports = class Anchor extends React.Component {

    static defaultProps = {
        internal: false,
    }

    // regex for internal ?

    render() {
        const style = Pod_Styler.getStyle(this);

        // var regex = /^(https?:\/\/|ftp:\/\/)/g;
        // if (regex.test(this.props.to) && !this.props.internal) {
        return (<a style={style.main} href={this.props.to}>{this.props.children}</a>);
        // }
        // else {
        //     return(<Link style={style.main} to={this.props.to}>{this.props.children}</Link>)
        // }
    }

};

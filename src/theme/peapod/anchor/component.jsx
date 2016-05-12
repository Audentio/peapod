/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


//Dependencies
import React from 'react';
import Pod_Styler from 'styler.js';
import {Link} from 'react-router'

/**
* Anchor component
* @element Code
*/
module.exports = class Anchor extends React.Component {

    static defaultProps = {
        internal: false
    }

    render() {
        var style = Pod_Styler.getStyle(this);

        var regex = /^(https?:\/\/|ftp:\/\/)/g;
        if (regex.test(this.props.to) && !this.props.internal) {
            return (<a style={style.main} href={this.props.href}>{this.props.children}</a>);
        }
        else {
            // dont ask me why the to value needs to be this way :L
            return(<Link to={`${this.props.href}`} style={style.main}>{this.props.children}</Link>)
        }

    }

};

import React from 'react';
import ReactDOM from 'react-dom';
var Pod_Styler = require('../styler.js');
var Wrapper = require('../wrapper.jsx')

class MenuItem extends React.Component {

    render() {
        var style = Pod_Styler.getStyle(this);

        var subtext = (this.props.subtext) ? (<div style={style.subtext}>{this.props.subtext}</div>) : '';

        if (this.props.href) {
            return (
                <div style={style.main}>
                    <a href={this.props.href} style={style.anchor}>
                        {subtext}
                        {this.props.children}
                    </a>
                </div>
            )
        } else {
            return (
                <div style={style.main}>
                    {subtext}
                    {this.props.children}
                </div>
            )
        }
    }
};

MenuItem.defaultProps = {
    subtext: ' '
};

module.exports = Wrapper(MenuItem);

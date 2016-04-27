import React from 'react';
import ReactDOM from 'react-dom';
var Pod_Styler = require('../styler.jsx');
var Wrapper = require('../wrapper.jsx')

class MenuItem extends React.Component {

    onHover() {
        console.log('hovered')
    }

    render() {
        var style = Pod_Styler.getStyle(this);

        if (this.props.href) {
            return (
                <div style={style.main} onHover={this.onHover()}>
                    <a href={this.props.href} style={style.anchor}>
                        {this.props.children}
                    </a>
                </div>
            )
        } else {
            return (
                <div style={style.main} onHover={this.onHover()}>
                    {this.props.children}
                </div>
            )
        }
    }
};

module.exports = Wrapper(MenuItem);

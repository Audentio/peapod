import React from 'react';
import ReactDOM from 'react-dom';
var Pod_Styler = require('../styler.jsx');
var Wrapper = require('../wrapper.jsx')

class SubMenu extends React.Component {

    render() {
        var style = Pod_Styler.getStyle(this);

        return (
            <div style={style.main}>
                {this.props.children}
            </div>
        )
    }
};

module.exports = Wrapper(SubMenu);

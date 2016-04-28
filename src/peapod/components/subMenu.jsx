import React from 'react';
import ReactDOM from 'react-dom';
var Pod_Styler = require('../styler.jsx');
var Wrapper = require('../wrapper.jsx')

class SubMenu extends React.Component {
    constructor() {
        super();

        this.state = {
            show: false
        }
    }

    mouseEnter() {
        this.setState({show: true})
    }
    mouseLeave() {
        this.setState({show: false})
    }

    render() {
        var style = Pod_Styler.getStyle(this);
        var children = (this.state.show) ? this.props.children : '';


        return (
            <div
                onMouseEnter={this.mouseEnter.bind(this)}
                onMouseLeave={this.mouseLeave.bind(this)}
            >
                {this.props.trigger}
                <div style={style.main}>
                    {children}
                </div>
            </div>
        )
    }
};

module.exports = Wrapper(SubMenu);

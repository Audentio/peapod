/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


//Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

var Pod_Styler = require('../styler.js');
var Wrapper = require('../wrapper.jsx')

/**
* Tooltip component
* @element Code
*/
class Tooltip extends React.Component {

    constructor() {
        super();
    }

    static defaultProps = {
        show: false,
        hovering: false, // to add
        arrow: false // to add
    }

    componentWillMount() {
        var {show, hovering} = this.props
        this.state = {show, hovering}
        console.log(this.state)
    }

    componentWillReceiveProps(nextProps) {
        var {show, hovering} = nextProps
        this.setState({show, hovering})
    }

    render() {
        var style = Pod_Styler.getStyle(this);

        var tooltip = (this.props.show) ? (
            <div style={style.tooltip}>
               <div style={style.arrow}></div>
               <div>{this.props.children}</div>
            </div>
        ) : '';

        return (
            <div style={style.main}>
                {tooltip}
            </div>
        );

    }

};

module.exports = Wrapper(Tooltip);

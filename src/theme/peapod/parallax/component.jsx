/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


// Dependencies
import React from 'react';
import Pod_Styler from 'utility/styler.js';

/**
* Parallax component
* @element Code
*/
module.exports = class Parallax extends React.Component {

    constructor() {
        super();

        this.onScroll = this.onScroll.bind(this);
        document.addEventListener("scroll", this.onScroll, false);
    }

    onScroll(event) {
        const element = this.refs.Parallax
        const rect = element.getBoundingClientRect()
        this.setState({height: (window.innerHeight / 2) - rect.top});
    }

    render() {
        const style = Pod_Styler.getStyle(this);
        style.back['transform'] = 'translateY(-'+String(this.state.height * 0.5)+'px)';
        style.front['transform'] = 'translateY(-'+String((this.state.height * 1))+'px)';

        return (
            <div style={style.main} onScroll={this.onScroll} ref="Parallax">
                <div style={style.back}>{this.props.background}</div>
                <div style={style.front}>{this.props.children}</div>
            </div>
        );

    }

};

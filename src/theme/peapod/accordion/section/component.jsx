/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React from 'react';
import Pod_Styler from 'styler.js';

module.exports = class Accordion_Section extends React.Component {
    static propTypes = {
        children: React.PropTypes.any,
    }

    render() {
        // const { styler, children, ...other } = this.props;
        const style = Pod_Styler.getStyle(this);

        // const contentStyle = Object.assign({}, style.content, style.contentLast);

        const content = (this.props.active) ? (<div style={style.content}>{this.props.children}</div>) : '';

        return (
            <div style={style.main}>
                <div style={style.title} onClick={() => {
                    this.props.onTitleClick(this.props.id);
                }}
                >{this.props.title}</div>
                {content}
            </div>
        );
    }

};

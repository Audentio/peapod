/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React from 'react';
import Pod_Styler from 'styler.js';
import { Card, Icon } from 'components.js';

module.exports = class Accordion_Section extends React.Component {
    static propTypes = {
        children: React.PropTypes.any,
    }

    constructor() {
        super();

        this.state = {
            open: false,
        };

        this.titleClick = this.titleClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ open: nextProps.active });
    }
    componentWillUnmount() {
        // setTimeout();
        // this.setState({ open:this.props.active });
    }

    titleClick() {
        const thisID = (this.state.open) ? -1 : this.props.id;
        this.props.onTitleClick(thisID);
    }

    render() {
        // const { styler, children, ...other } = this.props;
        const style = Pod_Styler.getStyle(this);

        // const contentStyle = Object.assign({}, style.content, style.contentLast);

        // const content = (this.props.active || this.state.animateClose) ? () : '';

        let subtitle;
        const subtitleProp = (typeof this.props.subtitle === 'string') ? [this.props.subtitle] : this.props.subtitle;
        if (subtitleProp) {
            subtitle = [];
            for (var i = 0; i < subtitleProp.length; i++) {
                subtitle.push(<div style={style.subtitle}>{subtitleProp[i]}</div>);
            }
        }

        return (
            <Card styler={{ style: style.main }}>
                <div style={style.title} onClick={this.titleClick}>
                    <Icon styler={{ style: style.icon }}>keyboard_arrow_down</Icon>
                    <div style={Object.assign({}, style.subtitle, style.maintitle)}>
                        {this.props.title}
                    </div>
                    {subtitle}
                </div>
                <div style={style.contentWrap}>
                    <div style={style.content}>{this.props.children}</div>
                </div>
            </Card>
        );
    }

};

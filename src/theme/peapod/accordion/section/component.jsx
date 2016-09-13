/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React from 'react';
import Styler from 'utility/styler.js';
import { Card, Icon } from 'utility/components.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    static propTypes = {
        children: React.PropTypes.any,
        id: React.PropTypes.number,
        subtitle: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.string,
        ]),
        title: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.string,
        ]),
        onTitleClick: React.PropTypes.func,
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
        const classes = Styler.getClasses(this);

        // const contentStyle = Object.assign({}, style.content, style.contentLast);

        // const content = (this.props.active || this.state.animateClose) ? () : '';

        let subtitle;
        const subtitleProp = (typeof this.props.subtitle === 'string') ? [this.props.subtitle] : this.props.subtitle;
        if (subtitleProp) {
            subtitle = [];
            for (let i = 0; i < subtitleProp.length; i++) {
                subtitle.push(<div key={i} className={classes.subtitle}>{subtitleProp[i]}</div>);
            }
        }

        return (
            <Card className={classes.main}>
                <div className={classes.title} onClick={this.titleClick}>
                    <Icon className={classes.icon}>keyboard_arrow_down</Icon>
                    <div className={`${classes.subtitle} ${classes.mainTitle}`}>
                        {this.props.title}
                    </div>
                    {subtitle}
                </div>
                <div className={classes.contentWrap}>
                    <div className={classes.content}>{this.props.children}</div>
                </div>
            </Card>
        );
    }

};

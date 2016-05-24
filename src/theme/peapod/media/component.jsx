/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

// Dependencies
import React from 'react';
import Pod_Styler from 'utility/styler.js';
import { Block, Heading, Photo } from 'utility/components.js';

/**
* Media component
* @element Code
*/
module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;
    static defaultProps = {
        title: '',
        figure: false,
        align: 'left',
        figureVertical: 'top',
        contentVertical: 'top',
        figureWidth: 'auto',
    }

    // Validate props
    static propTypes = {
        title: React.PropTypes.string,
        figure: React.PropTypes.oneOfType([
            React.PropTypes.object,
            React.PropTypes.bool,
            React.PropTypes.string,
        ]),
        align: React.PropTypes.string,
        figureVertical: React.PropTypes.string,
        contentVertical: React.PropTypes.string,
        figureWidth: React.PropTypes.string,
        children: React.PropTypes.any,
    }

    render() {
        const style = Pod_Styler.getStyle(this);

        const image = (typeof this.props.figure === 'string') ? <Photo src={this.props.figure} /> : this.props.figure;
        const figure = (this.props.figure) ? (
            <Block align={this.props.align} styler={{ mainStyle: style.figure }}>
                {image}
            </Block>
        ) : '';

        const figureLeft = (this.props.align === 'left') ? figure : '';
        const figureRight = (this.props.align === 'right') ? figure : '';

        const title = (this.props.title) ? (<Heading kind="h4">{this.props.title}</Heading>) : '';

        return (
            <Block styler={{ mainStyle: style.main }}>
                {figureLeft}
                <Block styler={{ mainStyle: style.content }}>
                    {title}
                    {this.props.children}
                </Block>
                {figureRight}
            </Block>
        );
    }
};

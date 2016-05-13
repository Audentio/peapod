/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


//Dependencies
import React from 'react';
import Pod_Styler from 'styler.js';
import {Block, Heading, Paragraph, Photo} from 'components.js'

/**
* Media component
* @element Code
*/
module.exports = class Media extends React.Component {
	static defaultProps = {
		title: false,
	    figure: false,
	    align: 'left',
        figureVertical: 'top',
        contentVertical: 'top',
        figureWidth: 'auto'
	}

    render() {
        var style = Pod_Styler.getStyle(this);

        var image = (typeof this.props.figure === 'string') ? <Photo src={this.props.figure}/> : this.props.figure;
        var figure = (this.props.figure) ? (
            <Block align={this.props.align} styler={{mainStyle: style.figure}}>
                {image}
            </Block>
        ) : '' ;

        var figureLeft = (this.props.align == 'left') ? figure : '';
        var figureRight = (this.props.align == 'right') ? figure : '';

        var title = (this.props.title) ? (<Heading kind="h4">{this.props.title}</Heading>): '';

        return (
            <Block styler={{mainStyle: style.main}}>
                {figureLeft}
                <Block styler={{mainStyle: style.content}}>
                    {title}
                    {this.props.children}
                </Block>
                {figureRight}
            </Block>
        );

    }

};

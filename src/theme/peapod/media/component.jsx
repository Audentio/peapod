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
	    image: false,
	    alignImage: 'left'
	}

    render() {
        var style = Pod_Styler.getStyle(this);

        var image = (this.props.image) ? (
            <Block align={this.props.alignImage}>
                <Photo src={this.props.image}/>
            </Block>
        ) : '' ;

        var title = (this.props.title) ? (<Heading kind="h4">{this.props.title}</Heading>): '';

        return (
            <Block style={style.main}>
                {image}
                <Block>
                    {title}
                    <Paragraph>
                        {this.props.children}
                    </Paragraph>
                </Block>
            </Block>
        );

    }

};

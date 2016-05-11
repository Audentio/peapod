/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


//Dependencies
import React from 'react';
import Pod_Styler from 'styler.js';
import Wrapper from 'wrapper.jsx';
import {Block, Heading, Paragraph, Photo} from 'components.js'

/**
* Media component
* @element Code
*/
class Media extends React.Component {

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

Media.defaultProps = {
    title: false,
    image: false,
    alignImage: 'right'
};

module.exports = Wrapper(Media);

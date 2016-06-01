/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React from 'react';
import Pod_Styler from 'utility/styler.js';
import { Icon, Photo, Anchor, BlockQuote } from 'utility/components.js';


/**
* Testimonial component
*
* @element Pod_alert
* @param {boolean} [dismissable=true] - Allow user to dismiss alert
* @param {string} [ID] - Unique identifier for persistent state storage
*
*/
module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    static propTypes = {
        children: React.PropTypes.any,
        img: React.PropTypes.string,
        name: React.PropTypes.string,
        comp: React.PropTypes.string,
        link: React.PropTypes.string,
    }

    render() {
        const style = Pod_Styler.getStyle(this);

        const image = (this.props.img) ? (
            <Photo styler={{ mainStyle: style.photo, imageStyle: style.photo }} src={this.props.img} />
        ) : '';

        const name = (this.props.name) ? (<div>{this.props.name}</div>) : '';
        const comp = (this.props.comp) ? (<div>{this.props.comp}</div>) : '';

        const link = (this.props.link) ? (
            <Anchor to={this.props.link}>
                {name}
                {comp}
            </Anchor>
        ) : (
            <div>
                {name}
                {comp}
            </div>
        );


        return (
            <div style={style.main}>
                {image}
                <div>
                    <Icon label="format_quote" styler={{ style: style.quoteIconRight }}>format_quote</Icon>
                    <Icon label="format_quote" styler={{ style: style.quoteIconLeft }}>format_quote</Icon>
                    <BlockQuote styler={{ mainStyle: style.blockQuote }}>
                        {this.props.children}
                    </BlockQuote>
                </div>
                {link}
            </div>
        );
    }
};

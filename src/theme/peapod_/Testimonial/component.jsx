/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React from 'react';
import Styler from 'utility/styler.js';
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
        hideQuotes: React.PropTypes.bool,
    }

    render() {
        const classes = Styler.getClasses(this);

        const image = (this.props.img) ? (
            <Photo className={{ main: classes.photo, image: classes.photo }} src={this.props.img} />
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
            <div className={classes.main}>
                {image}
                <div className={classes.content}>
                    {this.props.hideQuotes || <Icon label="format_quote" className={classes.quoteIconRight}>format_quote</Icon>}
                    {this.props.hideQuotes || <Icon label="format_quote" className={classes.quoteIconLeft}>format_quote</Icon>}
                    <div className={classes.quote}>
                        <BlockQuote className={classes.blockQuote}>
                            {this.props.children}
                        </BlockQuote>
                        {link}
                    </div>
                </div>
            </div>
        );
    }
};

/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

import React from 'react';
import Pod_Styler from 'styler.js';
import {Icon, Photo, Anchor, BlockQuote} from 'components.js';


/**
* Testimonial component
*
* @element Pod_alert
* @param {boolean} [dismissable=true] - Allow user to dismiss alert
* @param {string} [ID] - Unique identifier for persistent state storage
*
*/
module.exports = class Testimonial extends React.Component {
	render() {
	    var style = Pod_Styler.getStyle(this);

	    var image = (this.props.img) ? (
	        <Photo styler={{mainStyle: style.photo, imageStyle: style.photo }} src={this.props.img} />
	    ) : '';

	    var company = (this.props.img) ? (
	        <Anchor to={this.props.link}>{this.props.comp}</Anchor>
	    ) : (
	        <div>{this.props.comp}</div>
	    );

	    var name = (this.props.name) ? (<div>{this.props.name}</div>) : '';

	    return (
	        <div style={style.main}>
	            {image}
	            <BlockQuote styler={{mainStyle: style.blockQuote}}>{this.props.children}</BlockQuote>
	            {name}
	            {company}
	        </div>
	    );

	}
};

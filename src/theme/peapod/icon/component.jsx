/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

import React from 'react';
import Pod_Helper from 'helper.js'
import Pod_Styler from 'styler.js';



/**
* Icon component
*
* @element Pod_icon
* @param {string} animation - pre-defined animation
* @param {string} color - Icon color
* @param {string} label - Icon label (for tooltip and ARIA)
*/
module.exports = class Icon extends React.Component {

	static propTypes = {
		children: 		React.PropTypes.string.isRequired,
		animation: 		React.PropTypes.string,
		label: 			React.PropTypes.string,
		color: 			React.PropTypes.string
	}


	static defaultProps = {
		size: '1rem',
		color: 'inherit'
	}

	componentWillMount(){

		Pod_Helper.addStylesheet('IconFont', '//fonts.googleapis.com/icon?family=Material+Icons')

	}

	render() {
		var style = Pod_Styler.getStyle(this);

		return (
			<i {...this.props} className="material-icons" onClick={this.props.onClick} aria-label={this.props.label} title={this.props.label} style={style.main}>
				{this.props.children}
			</i>
		);
	}

};

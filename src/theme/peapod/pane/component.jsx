/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/



//Dependencies
import React from 'react';
import Pod_Styler from 'styler.js';

module.exports = class Pane extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			_podPaneWidth: -1
		}
	}

	static childContextTypes = {
		_podPaneWidth: React.PropTypes.number
	}

	getChildContext() {
		return {
			_podPaneWidth: this.state._podPaneWidth
		}
	}

	componentDidMount() {
		//initial check
		this.widthCheck();
		//start listening for viewport events
		window.addEventListener('resize', this.widthCheck.bind(this))
	}

	widthCheck() {
		var element = this.refs.pane
		if (typeof(element) !== 'undefined') {
			var width = element.offsetWidth;
		} else {
			var width = -1;
		}

		if (width != this.state._podPaneWidth){
			this.setState({_podPaneWidth: width});
		}
	}

	render() {
		var {styler, children, ...other} = this.props,
		style = Pod_Styler.getStyle(this);

		return (
			<div {...other} style={style.main} ref="pane">
				{this.props.children}
			</div>
		);
	}
};

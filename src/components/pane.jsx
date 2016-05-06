/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/



//Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

var Pod_Styler = require('../styler.js');
var Wrapper = require('../wrapper.jsx')


var Pane = React.createClass({
	childContextTypes: {
		_podPaneWidth: React.PropTypes.number
	},

	getInitialState() {
		return {
			_podPaneWidth: -1
		}
	},

	getChildContext() {
		return {
			_podPaneWidth: this.state._podPaneWidth
		}
	},

	componentDidMount() {
		//initial check
		this.widthCheck();
		//start listening for viewport events
		window.addEventListener('resize', this.widthCheck)
	},

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
	},

	render() {
		var {styler, children, ...other} = this.props,
		style = Pod_Styler.getStyle(this);

		return (
			<div {...other} style={style.main} ref="pane">
				{this.props.children}
			</div>
		);
	}
});

module.exports = Wrapper(Pane);

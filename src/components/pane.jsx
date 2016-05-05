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
	contextTypes: {
		width: React.PropTypes.number
	},

	getInitialState() {
		return {
			width: -1
		}
	},

	getChildContext() {
		return {
			width: this.state.width
		}
	},

	componentDidMount() {

		//initial check
		this.widthCheck();

		// bind this to width check always
		this.widthCheck = this.widthCheck.bind(this)

		//start listening for viewport events
		window.addEventListener('resize', this.widthCheck)

	},

	widthCheck() {
		var element = this.refs.pane
		var width = element.offsetWidth;

		if (width != this.state.width){
			this.setState({width: width});
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

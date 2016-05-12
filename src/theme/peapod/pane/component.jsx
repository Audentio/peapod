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

		if (typeof(window.Pod_Panes) == 'undefined') {
			window.Pod_Panes = {
				items: {},
				count: 0,

				add(getter, setter) {
					var item = {
						get: getter,
						set: setter,
						width: -1,
					}

					window.Pod_Panes.items[window.Pod_Panes.count] = item;
					window.Pod_Panes.count += 1;
				},

				remove(index) {
					delete Pod_Panes.items[index]
				},

				getAll() {
					for (var i = 0, len = Object.keys(window.Pod_Panes.items).length; i < len; i++) {
						Pod_Panes.items[i].width = Pod_Panes.items[i].get();
					}
				},

				setAll() {
					for (var i = 0, len = Object.keys(window.Pod_Panes.items).length; i < len; i++) {
						 Pod_Panes.items[i].set(Pod_Panes.items[i].width);
					}
				},

				updateAll() {
					//window.Pod_Panes.getAll();
					//window.Pod_Panes.setAll();

					for (var i = 0, len = Object.keys(window.Pod_Panes.items).length; i < len; i++) {
						 Pod_Panes.items[i].set(Pod_Panes.items[i].get());
					}
				}
			};

			window.addEventListener('resize', window.Pod_Panes.updateAll)

			document.addEventListener('DOMContentLoaded', window.Pod_Panes.updateAll)
		}

		this.paneIndex = window.Pod_Panes.add(this.widthGet.bind(this), this.widthSet.bind(this));
	}

	componentWillUnmount() {
		winodw.Pod_Panes.remove(this.paneIndex);
	}

	widthGet() {
		var element = this.refs.pane
		if (typeof(element) !== 'undefined') {
			return element.offsetWidth;
		} else {
			return -1;
		}
	}

	widthSet(width) {
		if (width != this.state._podPaneWidth){
			this.setState({_podPaneWidth: width});
		}
	}

	widthCheck() {
		this.widthSet(this.widthGet())
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

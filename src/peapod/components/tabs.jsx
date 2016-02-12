import React from 'react';
import ReactDOM from 'react-dom';

var Pod_Styler = require('../styler.jsx');



var Pod_tabTriggers = React.createClass({
	render: function() {
		return (
			<div>
				{this.props.children}
			</div>
		)
	}
})

var Pod_tabTrigger = React.createClass({
	render: function() {
		return (
			<div onClick={this.props.onClick} style={this.props.style}>
				{this.props.children}
			</div>
		)
	}
})

var Pod_tabPanels = React.createClass({
	render: function() {
		return (
			<div>
				{this.props.children}
			</div>
		)
	}
})

var Pod_tabPanel = React.createClass({
	render: function() {
		return (
			<div style={this.props.style}>
				{this.props.children}
			</div>
		)
	}
})


/**
* Template component
*
* @element Pod_template
*
*/
var Pod_tabs = React.createClass({

	//Validate props
	propTypes: {

	},

	getInitialState: function() {
		return {
			activeTab: this.props.activeTab
		}
	},

	//Default props
	getDefaultProps: function() {
		return {

		}
	},

	setTab: function(key) {
		this.setState({
			activeTab: key
		})
	},

	render: function() {
		var tabs = this.props.tabs || [],
			activeTab = this.state.activeTab;

		return (
			<div style={Pod_Styler.getStyle(this, 'wrapper')}>
				<Pod_tabTriggers style={Pod_Styler.getStyle(this, 'triggers')}>
					{tabs.map(function(tab, i){
						var key = tab.key || i,
							active = (key == activeTab),
							boundClick = this.setTab.bind(this, i),
							tabStyle = Pod_Styler.getStyle({}, 'trigger', {
								styleLike: 'Pod_tabs',
								active: active
							});

						return (
							<Pod_tabTrigger onClick={boundClick} key={'tabTrigger_' + key} target={key} style={tabStyle}>
								{tab.trigger}
							</Pod_tabTrigger>
						)
					}.bind(this))}
				</Pod_tabTriggers>
				<Pod_tabPanels style={Pod_Styler.getStyle(this, 'panels')}>
					{tabs.map(function(tab, i){
						var key = tab.key || i,
							active = (key == activeTab);

						return (
							<Pod_tabPanel key={'tabPanel_' + i} reference={key} style={Pod_Styler.getStyle({}, 'panel', {
								styleLike: 'Pod_tabs',
								active: active
							})}>
								{tab.content}
							</Pod_tabPanel>
						)
					}.bind(this))}
				</Pod_tabPanels>
			</div>
		);

	}

});

module.exports = Pod_tabs;

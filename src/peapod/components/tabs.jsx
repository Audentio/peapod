import React from 'react';
import ReactDOM from 'react-dom';

var Pod_Styler = require('../styler.jsx');
var Wrapper = require('../wrapper.jsx')



var TabTriggers = React.createClass({
	render: function() {
		return (
			<div>
				{this.props.children}
			</div>
		)
	}
})

var TabTrigger = React.createClass({
	render: function() {
		return (
			<div onClick={this.props.onClick} style={this.props.style}>
				{this.props.children}
			</div>
		)
	}
})

var TabPanels = React.createClass({
	render: function() {
		return (
			<div>
				{this.props.children}
			</div>
		)
	}
})

var TabPanel = React.createClass({
	render: function() {
		return (
			<div style={this.props.style}>
				{this.props.children}
			</div>
		)
	}
})



var Tabs = React.createClass({

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
				<TabTriggers style={Pod_Styler.getStyle(this, 'triggers')}>
					{tabs.map(function(tab, i){
						var key = tab.key || i,
							active = (key == activeTab),
							boundClick = this.setTab.bind(this, i),
							tabStyle = Pod_Styler.getStyle({}, 'trigger', {
								styleLike: 'Tabs',
								active: active
							});

						return (
							<TabTrigger onClick={boundClick} key={'tabTrigger_' + key} target={key} style={tabStyle}>
								{tab.trigger}
							</TabTrigger>
						)
					}.bind(this))}
				</TabTriggers>
				<TabPanels style={Pod_Styler.getStyle(this, 'panels')}>
					{tabs.map(function(tab, i){
						var key = tab.key || i,
							active = (key == activeTab);

						return (
							<TabPanel key={'tabPanel_' + i} reference={key} style={Pod_Styler.getStyle({}, 'panel', {
								styleLike: 'Tabs',
								active: active
							})}>
								{tab.content}
							</TabPanel>
						)
					}.bind(this))}
				</TabPanels>
			</div>
		);

	}

});

module.exports = Wrapper(Tabs);

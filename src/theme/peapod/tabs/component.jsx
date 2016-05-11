import React from 'react';
import Pod_Styler from 'styler.js';

var TabTriggers = React.createClass({
	render: function() {
		return (
			<div style={this.props.style}>
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
			<div style={this.props.style}>
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



module.exports = class Tabs extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			activeTab: props.activeTab
		}
	}

	setTab(key) {
		this.setState({
			activeTab: key
		})
	}

	render() {
		var tabs = this.props.tabs || [],
			activeTab = this.state.activeTab,
			style = Pod_Styler.getStyle(this);

		return (
			<div style={style.main}>
				<TabTriggers style={style.triggers}>
					{tabs.map(function(tab, i){
						var key = tab.key || i,
							active = (key == activeTab),
							boundClick = this.setTab.bind(this, i),
							tabStyle = Pod_Styler.getStyle({}, {
								styleLike: 'Tabs',
								active: active
							});

						return (
							<TabTrigger onClick={boundClick} key={'tabTrigger_' + key} target={key} style={tabStyle.trigger}>
								{tab.trigger}
							</TabTrigger>
						)
					}.bind(this))}
				</TabTriggers>
				<TabPanels style={style.panels}>
					{tabs.map(function(tab, i){
						var key = tab.key || i,
							active = (key == activeTab),
							panelStyle = Pod_Styler.getStyle({}, {
								styleLike: 'Tabs',
								active: active
							});

						return (
							<TabPanel key={'tabPanel_' + i} reference={key} style={panelStyle.panel}>
								{tab.content}
							</TabPanel>
						)
					}.bind(this))}
				</TabPanels>
			</div>
		);

	}

};

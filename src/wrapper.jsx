
import Radium from 'radium';
import React, { Component } from "react";

var Pod_Enhance = ComposedComponent => class extends Component {
	constructor() {
		super(...arguments);
		this.state = this.state || {};
	}

	/*
	componentDidMount() {
		//this.setState({ data: 'Hello' });
	}

	componentDidMount() {
		ComposedComponent.contextTypes = {
			_podPaneWidth: React.PropTypes.number
		}
	}
	*/

	render() {
		return <ComposedComponent {...this.props} />;
	}
};

var Pod_Wrapper = function(NewComponent) {
	return Radium(NewComponent);

	//return Pod_Enhance(Radium(NewComponent));
}

module.exports = Pod_Wrapper

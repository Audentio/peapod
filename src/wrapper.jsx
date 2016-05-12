
import Radium from 'radium';
import React, { Component } from 'react';

let Pod_Enhance = ComposedComponent => class extends Component {
  constructor() {
    super(...arguments);
    this.state = this.state || {};
  }

  componentDidMount() {
    ComposedComponent.contextTypes = {
      _podPaneWidth: React.PropTypes.number
    }
  }

  render() {
    return <ComposedComponent {...this.props} />;
  }
};

const Pod_Wrapper = function(NewComponent) {
  //return Radium(NewComponent);

  return Pod_Enhance(Radium(NewComponent));
};

module.exports = Pod_Wrapper;

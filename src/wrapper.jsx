
import radium from 'radium';
import React, { Component } from 'react';

const enhance = ComposedComponent => class extends Component {
    constructor(...args) {
        super(...args);
        this.state = this.state || {};
    }

    componentDidMount() {
        ComposedComponent.contextTypes = {
            _podPaneWidth: React.PropTypes.number,
        };
    }

    render() {
        return <ComposedComponent {...this.props} />;
    }
};

const Pod_Wrapper = function wrap(NewComponent) {
    return enhance(radium(NewComponent));
};

module.exports = Pod_Wrapper;

import React from 'react';
import Lazy from 'theme/peapod/Lazy/component.jsx';

const Pod_Enhance = function wrap(NewComponent) {
    if (typeof(NewComponent.contextTypes) === 'undefined') {
        NewComponent.contextTypes = {};
    }

    NewComponent.contextTypes._podPaneWidth = React.PropTypes.number; // add the pane width to the context

    class Enhancer extends NewComponent {
        static displayName = NewComponent.displayName;

        render() {
            if (this.props.lazy) {
                return <Lazy>{super.render()}</Lazy>;
            }
            return super.render();
        }
    }

    return Enhancer;
};

module.exports = Pod_Enhance;

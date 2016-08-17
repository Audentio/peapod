import React from 'react';
import Lazy from 'theme/peapod/Lazy/component.jsx';
import themesheet from 'utility/themes.js'

const Pod_Enhance = function wrap(NewComponent, stylesheet) {
    if (typeof(NewComponent.contextTypes) === 'undefined') {
        NewComponent.contextTypes = {};
    }

    NewComponent.contextTypes._podPaneWidth = React.PropTypes.number; // add the pane width to the context

    class Enhancer extends NewComponent {
        static displayName = NewComponent.displayName;

        constructor(props, context) {
            super(props, context);

            if (typeof(stylesheet) !== 'undefined') {
                this.stylesheet = stylesheet;
            }

            if (typeof(themesheet) !== 'undefined') {
                this.themesheet = themesheet;
            }
        }

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

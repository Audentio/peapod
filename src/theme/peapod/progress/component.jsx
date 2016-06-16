/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React from 'react';
import Pod_Styler from 'utility/styler.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;
    
    constructor(props, context) {
        super(props, context);
        this.getScale = this.getScale.bind(this);
    }

    static propTypes = {
        value: React.PropTypes.number,
        max: React.PropTypes.number,
    }

    static defaultProps = {
        value: -1,
        max: 100,
    }

    getScale() {
        const progress = (this.props.value < 0) ? 0 : this.props.value;
        const scale = progress / this.props.max;
        return {
            transform: `scaleX(${scale})`,
        };
    }

    render() {
        const style = Pod_Styler.getStyle(this);

        return (
            <div style={style.main}>
                <div style={[style.progress, this.getScale()]}></div>
            </div>
        );
    }
};

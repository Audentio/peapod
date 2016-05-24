import React from 'react';
import Pod_Styler from 'utility/styler.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    static propTypes = {
        date: React.PropTypes.any,
    }

    render() {
        const style = Pod_Styler.getStyle(this);
        const date = new Date(this.props.date);

        return (
            <li style={style.main}>
                {date.toLocaleDateString(window.navigator.language, { weekday: 'narrow' })}
            </li>
        );
    }

};

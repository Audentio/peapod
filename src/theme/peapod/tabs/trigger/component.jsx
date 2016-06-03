import React from 'react';
import Pod_Styler from 'utility/styler.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    static propTypes = {
        children: React.PropTypes.any,
        onClick: React.PropTypes.func,
    }

    render() {
        const style = Pod_Styler.getStyle(this);

        return (
            <div onClick={this.props.onClick} style={style.main}>
                {this.props.children}
            </div>
        );
    }

};

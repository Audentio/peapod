import React from 'react';
import Pod_Styler from 'styler.js';

module.exports = class Stepper_Step extends React.Component {

    static propTypes = {
        children: React.PropTypes.any,
    }

    onComponentWillMount() {
        this.state = {
            complete: 0,
        };
    }

    render() {
        const style = Pod_Styler.getStyle(this);

        return (
            <div style={style.main}>
                {this.props.children}
            </div>
        );
    }

};

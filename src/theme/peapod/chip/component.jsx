/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


// Dependencies
import React from 'react';
import Pod_Styler from 'utility/styler.js';
import { Icon } from 'utility/components.js'

/**
* Card component
* @element Code
*/
module.exports = componentName => class Pod_Component extends React.Component {


    static displayName = componentName;

    static defaultProps = {
        deleteTrigger: false,
        photo: false,
    }

    componentWillMount() {
        this.state = {
            showElement: true,
        }
    }

    removeChip() {
        this.setState({
            showElement: false,
        });
    }

    render() {
        const style = Pod_Styler.getStyle(this);

        const deleteTrigger = (this.props.deleteTrigger) ? (
            <Icon styler={{ style: style.deleteTrigger }} onClick={() => { this.removeChip(); }}>close</Icon>
        ) : '';
        const photo = (this.props.photo) ? (
            <img src={this.props.photo} style={style.photo}/>
        ) : '';

        if (this.state.showElement) {
            return (
                <div style={style.main}>
                    {photo}
                    {deleteTrigger}
                    {this.props.children}
                </div>
            );
        }
        return null;
    }

};

/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


//Dependencies
import React from 'react';
import Pod_Styler from 'styler.js';
import Wrapper from 'wrapper.jsx';
import {Icon} from 'components.js'

/**
* Card component
* @element Code
*/
class Chip extends React.Component {

    defaultProps = {
        deleteTrigger: false,
        photo: false
    }

    componentWillMount() {
        this.state = {
            showElement: true
        }
    }

    removeChip() {
        this.setState({
            showElement: false
        });
    }

    render() {
        var style = Pod_Styler.getStyle(this);

        var deleteTrigger = (this.props.deleteTrigger) ? (
            <Icon styler={{style: style.deleteTrigger}} onClick={() => {this.removeChip()}}>close</Icon>
        ) : '';
        var photo = (this.props.photo) ? (
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
        } else {
            return null;
        };

    }

};

module.exports = Wrapper(Chip);

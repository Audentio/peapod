/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


//Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

var Pod_Styler = require('../styler.js');
var Wrapper = require('../wrapper.jsx')

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
            <Pod.icon styler={{style: style.deleteTrigger}} onClick={() => {this.removeChip()}}>close</Pod.icon>
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
/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


//Dependencies
import React from 'react';
import ReactaDOM from 'react-dom';

var Pod_Styler = require('../styler.js');
var Wrapper = require('../wrapper.jsx')

/**
* Card component
* @element Code
*/
class Chip extends React.Component {

    componentWillMount() {
        this.defaultProps = {
            del: false,
            photo: false
        }
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

        var del = (this.props.del) ? (
            <Pod.icon styler={{style: style.del}} onClick={() => {this.removeChip()}}>close</Pod.icon>
        ) : '';
        var photo = (this.props.photo) ? (
            <img src={this.props.photo} style={style.photo}/>
        ) : '';

        if (this.state.showElement) {
            return (
                <div style={style.main}>
                    {photo}
                    {del}
                    {this.props.children}
                </div>
            );
        } else {
            return null;
        };

    }

};

module.exports = Wrapper(Chip);

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
* ListItem component
* @element Code
*/
class ListItem extends React.Component {

    render() {
        var style = Pod_Styler.getStyle(this);
        var image = '', icon = '', secondary = '';
        var deviderProps = {inline: true}

        var stylerObject = new Object(this.props.styler); // needs to be converted to a new object else throws an error
        if ('divider' in stylerObject) {
            if (stylerObject.divider == 'left') {
                deviderProps['indent'] = 72
            } else if (stylerObject.divider == 'right') {
                deviderProps['outdent'] = 72
            }
        }

        if (this.props.image) {
            image = (<div style={style.imageContainer}><img src={this.props.image} style={style.image}/></div>);
        }

        if (this.props.icon) {
            icon = (<Pod.icon styler={{style: style.icon}} onClick={this.props.onIconClick}>{this.props.icon}</Pod.icon>);
        }

        if (this.props.secondary) {
            secondary = (<div style={style.secondary}>{this.props.secondary}</div>)
        }

        return (
            <div>
                {icon}
                <div style={style.main}  onClick={this.props.onClick}>
                    {image}
                    {this.props.children}
                    {secondary}
                </div>
                <Pod.devider styler={deviderProps}></Pod.devider>
            </div>
        );

    }

};

module.exports = Wrapper(ListItem);

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
* ListItem component
* @element Code
*/
class ListItem extends React.Component {

    render() {
        var style = Pod_Styler.getStyle(this);
        var rightImg = '', leftIcon = '', secondary = '';
        var deviderProps = {inline: true}

        if (this.props.rightImage) {
            rightImg = (<div style={style.rightImageContainer}><img src={this.props.rightImage} style={style.rightImage}/></div>);
            deviderProps['indent'] = 72
        }

        if (this.props.leftIcon) {
            leftIcon = (<Pod.icon styler={{style: style.leftIcon}}>{this.props.leftIcon}</Pod.icon>);
        }

        if (this.props.secondary) {
            secondary = (<div style={style.secondary}>{this.props.secondary}</div>)
        }

        return (
            <div>
                <div style={style.main}>
                    {leftIcon}
                    {rightImg}
                    {this.props.children}
                    {secondary}
                </div>
                <Pod.devider styler={deviderProps}></Pod.devider>
            </div>
        );

    }

};

module.exports = Wrapper(ListItem);

/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


// Dependencies
import React from 'react';
import Pod_Styler from 'utility/styler.js';

import { Icon, Divider } from 'utility/components.js';

/**
* ListItem component
* @element Code
*/
module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    render() {
        var style = Pod_Styler.getStyle(this);
        var image = '', icon = '', secondary = '';
        var dividerProps = {inline: true}

        var stylerObject = new Object(this.props.styler); // needs to be converted to a new object else throws an error
        if ('divider' in stylerObject) {
            if (stylerObject.divider == 'left') {
                dividerProps['indent'] = 72
            } else if (stylerObject.divider == 'right') {
                dividerProps['outdent'] = 72
            }
        }

        if (this.props.image) {
            image = (<div style={style.imageContainer}><img src={this.props.image} style={style.image}/></div>);
        }

        if (this.props.icon) {
            icon = (<Icon styler={{style: style.icon}} onClick={this.props.onIconClick}>{this.props.icon}</Icon>);
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
                <Divider styler={dividerProps}></Divider>
            </div>
        );
    }

};

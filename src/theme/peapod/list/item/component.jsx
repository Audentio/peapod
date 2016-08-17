/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


// Dependencies
import React from 'react';
import Styler from 'utility/styler.js';

import { Icon, Divider } from 'utility/components.js';

/**
* ListItem component
* @element Code
*/
module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    static propTypes = {
        children: React.PropTypes.any,
        styler: React.PropTypes.object,
        image: React.PropTypes.string,
        icon: React.PropTypes.any,
        onIconClick: React.PropTypes.func,
        onClick: React.PropTypes.func,
        secondary: React.PropTypes.any,
    }

    render() {
        const classes = Styler.getClasses(this);
        let image = '';
        let icon = '';
        let secondary = '';
        const dividerProps = { inline: true };

        const stylerObject = new Object(this.props.styler); // needs to be converted to a new object else throws an error
        if ('divider' in stylerObject) {
            if (stylerObject.divider === 'left') {
                dividerProps.indent = 72;
            } else if (stylerObject.divider === 'right') {
                dividerProps.outdent = 72;
            }
        }

        if (this.props.image) {
            image = (<div className={classes.imageContainer}><img src={this.props.image} className={classes.image} alt="" /></div>);
        }

        if (this.props.icon) {
            icon = (<Icon styler={{ style: classes.style.icon }} onClick={this.props.onIconClick}>{this.props.icon}</Icon>);
        }

        if (this.props.secondary) {
            secondary = (<div className={classes.secondary}>{this.props.secondary}</div>);
        }

        return (
            <div>
                {icon}
                <div className={classes.main} onClick={this.props.onClick}>
                    {image}
                    {this.props.children}
                    {secondary}
                </div>
                {this.props.noDivider || <Divider styler={dividerProps} />}
            </div>
        );
    }

};

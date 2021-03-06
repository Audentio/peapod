/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React from 'react';
import Styler from 'utility/styler.js';
import { Input } from 'utility/components.js';

/**
*
* Textarea description
*
*/
module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    render() {
        const classes = Styler.getClasses(this);

        return (
            <Input {...this.props} className={classes.main} type="textarea" />
        );
    }
};

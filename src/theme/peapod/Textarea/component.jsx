/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React, { Component } from 'react';
import Pod_Styler from 'utility/styler.js';
import { Input } from 'utility/components.js';

/**
*
* Textarea description
*
*/
module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    render() {
        const style = Pod_Styler.getStyle(this);

        return (
            <Input {...this.props} style={style.main} type="textarea" />
        );
    }
};

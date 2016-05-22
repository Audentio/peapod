/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React, { Component } from 'react';
import Pod_Styler from 'styler';
import { Input } from 'components';

/**
*
* Textarea description
*
*/
module.exports = class Textarea extends Component {

    render() {
        const style = Pod_Styler.getStyle(this);

        return (
            <Input {...this.props} style={style.main} type="textarea" />
        );
    }

};

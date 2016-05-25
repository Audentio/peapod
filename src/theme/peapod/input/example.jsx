import React, { Component } from 'react';
import { ContentWrap, Input } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class LabelExample extends Component {

    render() {
        return (
            <ContentWrap>
                <Input placeholder="Placeholder..." /> <br />
                <Input validate type="email" placeholder="your e-mail" /> <br />
                <Input placeholder="Required*" required validate /> <br />
            </ContentWrap>
        );
    }

};

import React from 'react';
import { ContentWrap, Header } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class HeaderExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <ContentWrap>
                <Header>HTML Header Element</Header>
            </ContentWrap>
        );
    }

};

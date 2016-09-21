import React from 'react';
import { ContentWrap, Aside } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class AsideExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <ContentWrap>
                <Aside>HTML Aside Element</Aside>
            </ContentWrap>
        );
    }

};

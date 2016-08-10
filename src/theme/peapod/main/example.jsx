import React from 'react';
import { ContentWrap, Main } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class MainExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <ContentWrap>
                <Main>HTML Main Element</Main>
            </ContentWrap>
        );
    }

};

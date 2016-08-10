import React from 'react';
import { ContentWrap, Main } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class MainExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <Pod.ContentWrap>
                <Pod.Main>HTML Main Element</Pod.Main>
            </Pod.ContentWrap>
        );
    }

};

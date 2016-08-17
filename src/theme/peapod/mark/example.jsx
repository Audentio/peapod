import React from 'react';
import { ContentWrap, Mark } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class MarkExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <ContentWrap>
                <Mark>HTML Mark Element</Mark>
            </ContentWrap>
        );
    }

};

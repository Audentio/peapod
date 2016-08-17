import React from 'react';
import { ContentWrap, Heading } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class HeadingExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <ContentWrap>
                <Heading>Heading 1</Heading>
                <Heading kind="h2" preset="main">Heading 2</Heading>
                <Heading kind="h3">Heading 3</Heading>
                <Heading kind="h4">Heading 4</Heading>
                <Heading kind="h5">Heading 5</Heading>
                <Heading kind="h6">Heading 6</Heading>
            </ContentWrap>
        );
    }

};

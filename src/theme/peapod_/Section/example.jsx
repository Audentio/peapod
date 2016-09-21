import React from 'react';
import { ContentWrap, Section } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class SectionExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <ContentWrap>
                <Section>Section</Section>
            </ContentWrap>
        );
    }

};

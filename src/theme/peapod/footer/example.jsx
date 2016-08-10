import React from 'react';
import { ContentWrap, Footer } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class AccordionExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <ContentWrap>
                <Footer>HTML Footer Element</Footer>
            </ContentWrap>
        );
    }

};

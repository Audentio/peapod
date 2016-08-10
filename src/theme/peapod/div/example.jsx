import React from 'react';
import { ContentWrap, Div } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class AccordionExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <ContentWrap>
                <Div>HTML Div Element</Div>
            </ContentWrap>
        );
    }

};

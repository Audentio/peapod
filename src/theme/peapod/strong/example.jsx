import React from 'react';
import { ContentWrap, Strong } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class AccordionExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <ContentWrap>
                <Strong>Strong HTML Example</Strong>
            </ContentWrap>
        );
    }

};

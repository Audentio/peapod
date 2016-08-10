import React from 'react';
import { ContentWrap, Toolbar } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class AccordionExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <ContentWrap>
                <Toolbar>Lorem IPsum Dolor Sit Amet</Toolbar>
            </ContentWrap>
        );
    }

};

import React from 'react';
import { ContentWrap, Hr } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class AccordionExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <Pod.ContentWrap>
                <Pod.Hr />
            </Pod.ContentWrap>
        );
    }

};

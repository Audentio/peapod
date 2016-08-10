import React from 'react';
import { ContentWrap, SectionHeading } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class SectionHeadingExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <Pod.ContentWrap>
                <Pod.SectionHeading />
            </Pod.ContentWrap>
        );
    }

};

import React from 'react';
import { ContentWrap, RangeInput } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class RangeInputExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <ContentWrap>
                <RangeInput min={500} max={1000}></RangeInput>
            </ContentWrap>
        );
    }

};

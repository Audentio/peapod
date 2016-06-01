import React from 'react';
import Pod from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class AccordionExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <Pod.ContentWrap>
                <Pod.RangeInput min={500} max={1000} value={500}></Pod.RangeInput>
            </Pod.ContentWrap>
        );
    }

};

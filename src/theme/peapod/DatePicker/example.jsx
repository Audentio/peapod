import React from 'react';
import { ContentWrap, DatePicker } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class DatePickerExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <ContentWrap>
                <DatePicker />
            </ContentWrap>
        );
    }

};

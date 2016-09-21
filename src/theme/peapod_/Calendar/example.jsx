import React from 'react';
import { ContentWrap, Calendar } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class CalendarExample extends React.Component {

	shouldComponentUpdate = PureRender;

    render() {
        return (
            <ContentWrap>
                <Calendar />
            </ContentWrap>
        );
    }

};

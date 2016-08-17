import React from 'react';
import { ContentWrap, Hr } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class HrExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <ContentWrap>
                <Hr />
            </ContentWrap>
        );
    }

};

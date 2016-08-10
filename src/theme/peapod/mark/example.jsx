import React from 'react';
import { ContentWrap, Mark } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class MarkExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <Pod.ContentWrap>
                <Pod.Mark>HTML Mark Element</Pod.Mark>
            </Pod.ContentWrap>
        );
    }

};

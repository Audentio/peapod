import React from 'react';
import { ContentWrap, Json } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class JsonExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <ContentWrap>
                <Json
                    json={{ Mark: {
                        children: 'JSON Mark',
                    } }}
                ></Json>
            </ContentWrap>
        );
    }

};

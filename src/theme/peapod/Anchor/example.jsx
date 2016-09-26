import React from 'react';
import { ContentWrap } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class AnchorExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <ContentWrap>
                <Anchor to="http://google.com">Anchor to google</Anchor>
            </ContentWrap>
        );
    }

};

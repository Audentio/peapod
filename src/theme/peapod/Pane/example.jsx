import React from 'react';
import { ContentWrap } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class PaneExample extends React.Component {

	shouldComponentUpdate = PureRender;

    render() {
        return (
            <ContentWrap>
                Write this example
            </ContentWrap>
        );
    }

};

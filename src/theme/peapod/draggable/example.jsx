import React from 'react';
import { ContentWrap } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class DraggableExample extends React.Component {

	shouldComponentUpdate = PureRender;

    render() {
        return (
            <Pod.ContentWrap>
                Write this example
            </Pod.ContentWrap>
        );
    }

};

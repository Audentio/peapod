import React from 'react';
import { ContentWrap } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class TextareaExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <ContentWrap>
                Write this example
                {/* <Textarea value="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />*/}
            </ContentWrap>
        );
    }

};

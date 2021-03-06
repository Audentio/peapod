import React from 'react';
import { ContentWrap, Lazy, Embed } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class EmbedExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <div>
                <ContentWrap>
                    <Lazy height="480px" distance="50">
                        <Embed width="100%" height="480px" src="https://www.youtube.com/embed/QhUzmR8eZAo" />
                    </Lazy>
                </ContentWrap>
            </div>
        );
    }

};

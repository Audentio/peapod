import React from 'react';
import { ContentWrap, Lazy, Photo } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class LazyExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <ContentWrap>
                <Lazy stay={false}>
                    <Photo src="/assets/media/bg.jpg"></Photo>
                </Lazy>
            </ContentWrap>
        );
    }

};

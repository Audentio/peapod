import React from 'react';
import { ContentWrap, Photo } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class PhotoExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <ContentWrap>
                <Photo src="/assets/media/profile.jpg"></Photo>
            </ContentWrap>
        );
    }

};

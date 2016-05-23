import React, { Component } from 'react';
import { ContentWrap, Video } from 'components.js';

module.exports = class TimestampExample extends Component {

    render() {
        return (
            <ContentWrap>
                <Video src="assets/media/sample_long.mp4" poster="assets/media/sample_poster.png" />
            </ContentWrap>
        );
    }
};

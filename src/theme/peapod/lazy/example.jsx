import React from 'react';
import { ContentWrap, Lazy, Photo } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class AccordionExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <Pod.ContentWrap>
                <Pod.Lazy stay={false}>
                    <Pod.Photo src="/assets/media/bg.jpg"></Pod.Photo>
                </Pod.Lazy>
            </Pod.ContentWrap>
        );
    }

};

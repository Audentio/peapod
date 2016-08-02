import React from 'react';
import Pod from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class PhotoExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <Pod.ContentWrap>
                <Pod.Photo src="/assets/media/profile.jpg"></Pod.Photo>
            </Pod.ContentWrap>
        );
    }

};

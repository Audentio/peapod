import React from 'react';
import Pod from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class PhotoExample extends React.Component {

	shouldComponentUpdate = PureRender;

    render() {
        return (
            <Pod.ContentWrap>
                Example
            </Pod.ContentWrap>
        );
    }

};

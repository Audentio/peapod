import React from 'react';
import { ContentWrap, Aside } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class AsideExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <Pod.ContentWrap>
                <Pod.Aside>HTML Aside Element</Pod.Aside>
            </Pod.ContentWrap>
        );
    }

};

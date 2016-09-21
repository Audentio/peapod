import React from 'react';
import { ContentWrap, Nav } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class NavExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <ContentWrap>
                <Nav>
                    <ul>
                        <li>HTML Nav Element</li>
                    </ul>
                </Nav>
            </ContentWrap>
        );
    }

};

import React from 'react';
import { ContentWrap, Breadcrump } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class BreadcrumbExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <ContentWrap>
                <Breadcrumb children={['Home', 'Forums', 'Subforums', 'Best way to handle these?']}></Breadcrumb>
            </ContentWrap>
        );
    }

};

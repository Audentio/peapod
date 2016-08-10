import React from 'react';
import { ContentWrap, Article } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class ArticleExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <ContentWrap>
                <Article>HTML Article Element</Article>
            </ContentWrap>
        );
    }

};

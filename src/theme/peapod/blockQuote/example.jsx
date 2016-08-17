import React from 'react';
import { ContentWrap, BlockQuote} from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class BlockQuoteExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <ContentWrap>
                <BlockQuote>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit iure dolorem rem quidem consequatur. Incidunt molestiae fugiat, vero! Aperiam eum voluptatum perferendis quam, sapiente modi vitae debitis provident non consequatur.
                </BlockQuote>
            </ContentWrap>
        );
    }

};

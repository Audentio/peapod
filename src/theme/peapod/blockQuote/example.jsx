import React from 'react';
import Pod from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class BlockQuoteExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <div>
                <Pod.ContentWrap>
                    <Pod.BlockQuote>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit iure dolorem rem quidem consequatur. Incidunt molestiae fugiat, vero! Aperiam eum voluptatum perferendis quam, sapiente modi vitae debitis provident non consequatur.
                    </Pod.BlockQuote>
                </Pod.ContentWrap>
            </div>
        );
    }

};

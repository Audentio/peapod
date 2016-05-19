import React from 'react';
import Pod from 'components.js';

module.exports = class BlockQuoteExample extends React.Component {

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

}

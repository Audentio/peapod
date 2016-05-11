import React from 'react'
import Pod from 'components.js'

export default class BlockquoteSection extends React.Component {

    render () {
        return (
            <Pod.Section key={'blockquote'}>
                <Pod.ContentWrap>
                    <Pod.Heading>Blockquote</Pod.Heading>
                    <Pod.BlockQuote>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit iure dolorem rem quidem consequatur. Incidunt molestiae fugiat, vero! Aperiam eum voluptatum perferendis quam, sapiente modi vitae debitis provident non consequatur.
                    </Pod.BlockQuote>
                </Pod.ContentWrap>
            </Pod.Section>
        )
    }

}

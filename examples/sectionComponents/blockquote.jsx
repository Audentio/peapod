import React from 'react'
import ReactDOM from 'react-dom'
import 'components'
import Paragraph from 'components/paragraph'
import Strong from 'components/strong'
import Code from 'components/code'

export default class BlockquoteSection extends React.Component {

    render () {
        return (
            <Pod.section key={'blockquote'}>
                <Pod.contentWrap>
                    <Pod.heading>Blockquote</Pod.heading>
                    <Pod.blockQuote>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit iure dolorem rem quidem consequatur. Incidunt molestiae fugiat, vero! Aperiam eum voluptatum perferendis quam, sapiente modi vitae debitis provident non consequatur.
                    </Pod.blockQuote>
                </Pod.contentWrap>
            </Pod.section>
        )
    }

}
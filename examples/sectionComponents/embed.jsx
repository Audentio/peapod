import React from 'react'
import ReactDOM from 'react-dom'
import 'components'
import Paragraph from 'components/paragraph'
import Strong from 'components/strong'
import Code from 'components/code'

export default class EmbedSection extends React.Component {

    render () {

        return(
            <Pod.section key={'Embed'}>
                <Pod.contentWrap>
                    <Pod.heading>Embed</Pod.heading>

                    <Pod.lazy height="480px" distance="50">
                        <Pod.embed width="100%" height="480px" src="https://www.youtube.com/embed/QhUzmR8eZAo" />
                    </Pod.lazy>


                </Pod.contentWrap>
            </Pod.section>
        )
    }

}
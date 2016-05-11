import React from 'react'
import Pod from 'components.js'

export default class EmbedSection extends React.Component {

    render () {

        return(
            <Pod.Section key={'Embed'}>
                <Pod.ContentWrap>
                    <Pod.Heading>Embed</Pod.Heading>

                    <Pod.Lazy height="480px" distance="50">
                        <Pod.Embed width="100%" height="480px" src="https://www.youtube.com/embed/QhUzmR8eZAo" />
                    </Pod.Lazy>


                </Pod.ContentWrap>
            </Pod.Section>
        )
    }

}

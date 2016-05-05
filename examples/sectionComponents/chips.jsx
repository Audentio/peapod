import React from 'react'
import ReactDOM from 'react-dom'
import 'components'
import Paragraph from 'components/paragraph'
import Strong from 'components/strong'
import Code from 'components/code'

export default class ChipsSection extends React.Component {

    render () {
        return (
            <Pod.section key={'chips'}>
                <Pod.contentWrap>
                    <Pod.heading>Chips</Pod.heading>
                    <Pod.chip>This is a chip</Pod.chip>
                    <Pod.chip deleteTrigger={true}>Chip with Delete</Pod.chip>
                    <Pod.chip photo='profile@2x.jpg'>Chip with Photo</Pod.chip>
                    <Pod.chip deleteTrigger={true} photo='profile@2x.jpg'>Chip with Delete & Photo</Pod.chip>
                </Pod.contentWrap>
            </Pod.section>
        )
    }

}
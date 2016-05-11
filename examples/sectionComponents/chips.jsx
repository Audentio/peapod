import React from 'react'
import Pod from 'components.js'

export default class ChipsSection extends React.Component {

    render () {
        return (
            <Pod.Section key={'Chips'}>
                <Pod.ContentWrap>
                    <Pod.Heading>Chips</Pod.Heading>
                    <Pod.Chip>This is a Chip</Pod.Chip>
                    <Pod.Chip deleteTrigger={true}>Chip with Delete</Pod.Chip>
                    <Pod.Chip photo='profile@2x.jpg'>Chip with Photo</Pod.Chip>
                    <Pod.Chip deleteTrigger={true} photo='profile@2x.jpg'>Chip with Delete & Photo</Pod.Chip>
                </Pod.ContentWrap>
            </Pod.Section>
        )
    }

}

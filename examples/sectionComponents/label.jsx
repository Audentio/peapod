import React from 'react'
import Pod from 'components.js'

export default class LabelSection extends React.Component {

    render () {
        return (
            <Pod.Section key={'label'}>
                <Pod.ContentWrap>
                    <Pod.Heading>Label</Pod.Heading>
                    <Pod.Label icon="settings" styler={{
                            kind: 'success',
                            disabled: true,
                            round: true
                        }}>Test Label</Pod.Label>
				</Pod.ContentWrap>
            </Pod.Section>
        )
    }

}

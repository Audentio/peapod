import React from 'react'
import ReactDOM from 'react-dom'
import 'components'
import Paragraph from 'components/paragraph'
import Strong from 'components/strong'
import Code from 'components/code'

export default class LabelSection extends React.Component {

    render () {
        return (
            <Pod.section key={'label'}>
                <Pod.contentWrap>
                    <Pod.heading>Label</Pod.heading>
                    <Pod.label icon="settings" styler={{
                            kind: 'success',
                            disabled: true,
                            round: true
                        }}>Test Label</Pod.label>
                </Pod.contentWrap>
            </Pod.section>
        )
    }

}
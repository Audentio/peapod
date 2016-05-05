import React from 'react'
import ReactDOM from 'react-dom'
import 'components'
import Paragraph from 'components/paragraph'
import Strong from 'components/strong'
import Code from 'components/code'

export default class ButtonsSection extends React.Component {

    render () {
        return (
            <Pod.section key={'buttons'}>
                <Pod.contentWrap>

                    <Pod.heading>Buttons</Pod.heading>

                    <Pod.button label="Default" />
                    <Pod.button label="General" styler={{kind: 'general'}} />
                    <Pod.button label="Primary" styler={{kind:'primary'}} />
                    <Pod.button label="Success" styler={{kind:'success'}} />
                    <Pod.button label="Danger" styler={{kind:'danger'}} />
                    <Pod.button label="Warning" styler={{kind:'warning'}} />

                    <br /><br />
                    <Pod.button label="Raised" styler={{kind: "primary", raised: true}} />
                    <Pod.button label="Round" styler={{kind: "primary", round: true}} />
                    <Pod.button label="Disabled" styler={{kind:"primary", disabled: true}} />
                    <Pod.button styler={{kind: "success", round:true, raised: true}} />
                    <Pod.button styler={{kind: "base"}} onClick={function(){alert('test')}} label="onClick handler" />
                    <Pod.button styler={{kind: "base"}} href="http://peapod.io" label="Anchor/Link" kind="primary" />

                </Pod.contentWrap>
            </Pod.section>
        )
    }

}
import React from 'react'
import Pod from 'components.js'

export default class ButtonsSection extends React.Component {

    render () {
        return (
            <Pod.Section key={'buttons'}>
                <Pod.ContentWrap>

                    <Pod.Heading>Buttons</Pod.Heading>

                    <Pod.Button label="Default" />
                    <Pod.Button label="General" styler={{kind: 'general'}} />
                    <Pod.Button label="Primary" styler={{kind:'primary'}} />
                    <Pod.Button label="Success" styler={{kind:'success'}} />
                    <Pod.Button label="Danger" styler={{kind:'danger'}} />
                    <Pod.Button label="Warning" styler={{kind:'warning'}} />

                    <br /><br />
                    <Pod.Button label="Raised" styler={{kind: "primary", raised: true}} />
                    <Pod.Button label="Round" styler={{kind: "primary", round: true}} />
                    <Pod.Button label="Disabled" styler={{kind:"primary", disabled: true}} />
                    <Pod.Button styler={{kind: "success", round:true, raised: true}} />
                    <Pod.Button styler={{kind: "base"}} onClick={function(){alert('test')}} label="onClick handler" />
                    <Pod.Button styler={{kind: "base"}} href="http://peapod.io" label="Anchor/Link" kind="primary" />

                </Pod.ContentWrap>
            </Pod.Section>
        )
    }

}

import React from 'react'
import ReactDOM from 'react-dom'
import 'components'
import Paragraph from 'components/paragraph'
import Strong from 'components/strong'
import Code from 'components/code'

export default class ModalsSection extends React.Component {

    render () {
        return (
            <Pod.section key={'modals'}>
                <Pod.contentWrap>

                    <Pod.heading>Modals, Overlays and Centers</Pod.heading>

                    <Pod.portal trigger={
                        <Pod.button label="Modal, Overlay and Center" />
                    } closeOnEsc={true} noArrow={true}>
                        <Pod.modal>
                            <Pod.heading kind="h2">Heading2 test</Pod.heading>
                            <Pod.paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Pod.paragraph>
                            <Pod.button label="You are a cabbage" styler={{kind:'primary'}} />
                        </Pod.modal>
                    </Pod.portal>

                    <Pod.portal trigger={
                        <Pod.button label="Button, Overlay and Center" />
                    } closeOnEsc={true} noArrow={true}>
                        <Pod.overlay>
                            <Pod.button label="You are a cabbage" styler={{kind:'primary'}} />
                        </Pod.overlay>
                    </Pod.portal>

                    <Pod.portal trigger={
                        <Pod.button label="Card, Overlay and Center" />
                    } closeOnEsc={true} noArrow={true}>
                        <Pod.overlay>
                            <Pod.card styler={{style:{width: '350px'}}}>

                                <Pod.cardSection styler={{kind:'title-supports'}}>
                                    <Pod.heading kind="h5" styler={{secondary: true}}>Hello there</Pod.heading>
                                </Pod.cardSection>
                                <Pod.cardSection styler={{kind:'supporting-text'}}>
                                    <Pod.paragraph styler={{secondary: true}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</Pod.paragraph>
                                </Pod.cardSection>
                                <Pod.cardSection styler={{kind:'action-bar', align: 'right'}}>
                                    <Pod.button label="Agree" />
                                    <Pod.button label="Disagree" />
                                </Pod.cardSection>
                            </Pod.card>
                        </Pod.overlay>
                    </Pod.portal>
                </Pod.contentWrap>
            </Pod.section>
        )
    }

}
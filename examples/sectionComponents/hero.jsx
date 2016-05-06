import React from 'react'
import ReactDOM from 'react-dom'
import 'components'
import Paragraph from 'components/paragraph'
import Strong from 'components/strong'
import Code from 'components/code'

export default class HeroSection extends React.Component {

    render () {
        return(
            <Pod.hero key={'hero'} styler={{cover: true, style: {backgroundImage: 'url(mrRobot.jpg)'}}}>
                <Pod.heroOverlay styler={{position:'left'}}>
                    <Pod.center>
                        <Pod.card styler={{disguised: true, style:{maxWidth: '500px'}}}>

                        <Pod.cardSection styler={{kind:'title-supports'}}>
                            <Pod.heading kind="h2" styler={{secondary: true}}>I'm a card in disguese!</Pod.heading>
                            <Pod.heading kind="h5" styler={{secondary: true}}>Damion: Add option to look this way to cards</Pod.heading>
                        </Pod.cardSection>
                        <Pod.cardSection styler={{kind:'supporting-text'}}>
                            <Pod.paragraph styler={{secondary: true}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Pod.paragraph>
                        </Pod.cardSection>
                        <Pod.cardSection styler={{kind:'action-bar'}}>
                            <Pod.button label="Find Out More" />
                        </Pod.cardSection>
                    </Pod.card>
                    </Pod.center>
                </Pod.heroOverlay>
            </Pod.hero>
        )
    }

}
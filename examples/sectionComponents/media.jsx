import React from 'react'
import ReactDOM from 'react-dom'
import 'components'
import Paragraph from 'components/paragraph'
import Strong from 'components/strong'
import Code from 'components/code'

export default class MediaSection extends React.Component {

    render () {
        return(
            <Pod.section key={'media'}>
                <Pod.contentWrap>
                    <Pod.heading>Media Elements</Pod.heading>
                    <Pod.grid>
                        <Pod.gridCell styler={{md:6}}>
                            <Pod.block>
                                <Pod.blockLeft>
                                    <Pod.photo src="smallimg.png" />
                                </Pod.blockLeft>
                                <Pod.block>
                                    <Pod.heading kind="h4">Not a media element(Level 1 elements)</Pod.heading>
                                    <Pod.paragraph> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint quaerat ex, rerum nulla officia expedita deleniti excepturi debitis vitae ea deserunt. Nihil quo voluptate ad atque veritatis, officia itaque sunt!

                                        <Pod.anchor href="apples.com">Anchor</Pod.anchor>.
                                        <Pod.anchor href="www.apples.com">Anchor</Pod.anchor>.
                                        <Pod.anchor href="http://apples.com">Anchor</Pod.anchor>.
                                        <Pod.anchor href="https://apples.com">Anchor</Pod.anchor>.
                                    </Pod.paragraph>
                                </Pod.block>
                            </Pod.block>
                        </Pod.gridCell>

                        <Pod.gridCell styler={{md:6}}>
                            <Pod.media image="smallimg.png" title="A media element">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui ex asperiores rem alias aspernatur quis fugiat eum tempore quaerat.
                            </Pod.media>
                        </Pod.gridCell>
                    </Pod.grid>

                </Pod.contentWrap>
            </Pod.section>
        )
    }

}
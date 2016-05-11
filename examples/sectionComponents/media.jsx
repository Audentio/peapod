import React from 'react'
import Pod from 'components.js'

export default class MediaSection extends React.Component {

    render () {
        return(
            <Pod.Section key={'media'}>
                <Pod.ContentWrap>
                    <Pod.Heading>Media Elements</Pod.Heading>
                    <Pod.Grid>
                        <Pod.Grid_Cell styler={{md:6}}>
                            <Pod.Block>
                                <Pod.Block_Left>
                                    <Pod.Photo src="smallimg.png" />
                                </Pod.Block_Left>
                                <Pod.Block>
                                    <Pod.Heading kind="h4">Not a media element(Level 1 elements)</Pod.Heading>
                                    <Pod.Paragraph> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint quaerat ex, rerum nulla officia expedita deleniti excepturi debitis vitae ea deserunt. Nihil quo voluptate ad atque veritatis, officia itaque sunt!

                                        <Pod.Anchor to="apples.com">Anchor</Pod.Anchor>.
                                        <Pod.Anchor to="www.apples.com">Anchor</Pod.Anchor>.
                                        <Pod.Anchor to="http://apples.com">Anchor</Pod.Anchor>.
                                        <Pod.Anchor to="https://apples.com">Anchor</Pod.Anchor>.
                                    </Pod.Paragraph>
                                </Pod.Block>
                            </Pod.Block>
                        </Pod.Grid_Cell>

                        <Pod.Grid_Cell styler={{md:6}}>
                            <Pod.Media image="smallimg.png" title="A media element">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui ex asperiores rem alias aspernatur quis fugiat eum tempore quaerat.
                            </Pod.Media>
                        </Pod.Grid_Cell>
                    </Pod.Grid>

                </Pod.ContentWrap>
            </Pod.Section>
        )
    }

}

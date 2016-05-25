import React from 'react';
import Pod from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class MediaExample extends React.Component {

	shouldComponentUpdate = PureRender;

    render() {
        return (
            <div>
                <Pod.ContentWrap>
                    <Pod.Grid>
                        <Pod.Grid_Cell styler={{ md: 6 }}>
                            <Pod.Block>
                                <Pod.Block_Left>
                                    <Pod.Photo src="assets/media/smallimg.png" />
                                </Pod.Block_Left>
                                <Pod.Block>
                                    <Pod.Heading kind="h4">Not a media element(Level 1 elements)</Pod.Heading>
                                    <Pod.Paragraph> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint quaerat ex, rerum nulla officia expedita deleniti excepturi debitis vitae ea deserunt. Nihil quo voluptate ad atque veritatis, officia itaque sunt!

                                        <Pod.Anchor href="apples.com">Anchor</Pod.Anchor>.
                                        <Pod.Anchor href="www.apples.com">Anchor</Pod.Anchor>.
                                        <Pod.Anchor href="http://apples.com">Anchor</Pod.Anchor>.
                                        <Pod.Anchor href="https://apples.com">Anchor</Pod.Anchor>.
                                    </Pod.Paragraph>
                                </Pod.Block>
                            </Pod.Block>
                        </Pod.Grid_Cell>

                        <Pod.Grid_Cell styler={{ md: 6 }}>
                            <Pod.Media image="assets/media/smallimg.png" title="A media element">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui ex asperiores rem alias aspernatur quis fugiat eum tempore quaerat.
                            </Pod.Media>
                        </Pod.Grid_Cell>
                    </Pod.Grid>

                </Pod.ContentWrap>
            </div>
        );
    }

};

import React from 'react';
import { ContentWrap, Grid, Grid_Cell, Media, } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class MediaExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <div>
                <ContentWrap>
                    <Grid>

                        <Grid_Cell styler={{ md: 6 }}>
                            <Card>
                                <Media figure="assets/media/smallimg.png" title="A media element">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui ex asperiores rem alias aspernatur quis fugiat eum tempore quaerat.
                                </Media>
                            </Card>
                        </Grid_Cell>

                        <Grid_Cell styler={{ md: 6 }}>
                            <Card>
                                <Media figure="assets/media/smallimg.png" title="A media element">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui ex asperiores rem alias aspernatur quis fugiat eum tempore quaerat.
                                </Media>
                            </Card>
                        </Grid_Cell>

                    </Grid>

                </ContentWrap>
            </div>
        );
    }

};

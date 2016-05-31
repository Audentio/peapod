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
                            <Pod.Card>
                                <Pod.Media figure="assets/media/smallimg.png" title="A media element">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui ex asperiores rem alias aspernatur quis fugiat eum tempore quaerat.
                                </Pod.Media>
                            </Pod.Card>
                        </Pod.Grid_Cell>

                        <Pod.Grid_Cell styler={{ md: 6 }}>
                            <Pod.Card>
                                <Pod.Media figure="assets/media/smallimg.png" title="A media element">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui ex asperiores rem alias aspernatur quis fugiat eum tempore quaerat.
                                </Pod.Media>
                            </Pod.Card>
                        </Pod.Grid_Cell>

                    </Pod.Grid>

                </Pod.ContentWrap>
            </div>
        );
    }

};

import React from 'react';
import Pod from 'utility/components.js';
import PureRender from 'utility/pureRender.js';


module.exports = class ModalExample extends React.Component {

    shouldComponentUpdate = PureRender;
    render() {
        return (
            <div>
                <Pod.ContentWrap>
                    <Pod.Portal
                        trigger={
                            <Pod.Button label="Modal, Overlay and Center" />
                        }
                        closeOnEsc
                        noArrow
                    >
                        <Pod.Modal>
                            <Pod.Heading kind="h2">Heading2 test</Pod.Heading>
                            <Pod.Paragraph>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </Pod.Paragraph>
                            <Pod.Button label="You are a cabbage" styler={{ kind: 'success' }} />
                        </Pod.Modal>
                    </Pod.Portal>

                    <Pod.Portal
                        trigger={
                            <Pod.Button label="Button, Overlay and Center" />
                        }
                        closeOnEsc
                        noArrow
                    >
                        <Pod.Overlay>
                            <Pod.Button label="You are a cabbage" styler={{ kind: 'info' }} />
                        </Pod.Overlay>
                    </Pod.Portal>

                    <Pod.Portal
                        trigger={
                            <Pod.Button label="Card, Overlay and Center" />
                        }
                        closeOnEsc
                        noArrow
                    >
                        <Pod.Overlay>
                            <Pod.Card styler={{ style: { width: '350px' } }}>
                                <Pod.Card_Section styler={{ kind: 'title-supports' }}>
                                    <Pod.Heading kind="h5" styler={{ secondary: true }}>Hello there</Pod.Heading>
                                </Pod.Card_Section>
                                <Pod.Card_Section styler={{ kind: 'supporting-text' }}>
                                    <Pod.Paragraph styler={{ secondary: true }}>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                                    </Pod.Paragraph>
                                </Pod.Card_Section>
                                <Pod.Card_Section styler={{ kind: 'action-bar', align: 'right' }}>
                                    <Pod.Button label="Agree" />
                                    <Pod.Button label="Disagree" />
                                </Pod.Card_Section>
                            </Pod.Card>
                        </Pod.Overlay>
                    </Pod.Portal>
                </Pod.ContentWrap>
            </div>
        );
    }

};

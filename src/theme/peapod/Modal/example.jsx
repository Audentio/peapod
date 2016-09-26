import React from 'react';
import { ContentWrap, Portal, Button, Modal, Heading, Paragraph, Overlay, Card, Card_Section } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class ModalExample extends React.Component {

    shouldComponentUpdate = PureRender;
    render() {
        return (
            <div>
                <ContentWrap>
                    <Portal
                        trigger={
                            <Button label="Modal, Overlay and Center" />
                        }
                        closeOnEsc
                        noArrow
                    >
                        <Modal>
                            <Heading kind="h2">Heading2 test</Heading>
                            <Paragraph>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </Paragraph>
                            <Button label="You are a cabbage" styler={{ kind: 'success' }} />
                        </Modal>
                    </Portal>

                    <Portal
                        trigger={
                            <Button label="Button, Overlay and Center" />
                        }
                        closeOnEsc
                        noArrow
                    >
                        <Overlay>
                            <Button label="You are a cabbage" styler={{ kind: 'info' }} />
                        </Overlay>
                    </Portal>

                    <Portal
                        trigger={
                            <Button label="Card, Overlay and Center" />
                        }
                        closeOnEsc
                        noArrow
                    >
                        <Overlay>
                            <Card styler={{ style: { width: '350px' } }}>
                                <Card_Section styler={{ kind: 'title-supports' }}>
                                    <Heading kind="h5" styler={{ secondary: true }}>Hello there</Heading>
                                </Card_Section>
                                <Card_Section styler={{ kind: 'supporting-text' }}>
                                    <Paragraph styler={{ secondary: true }}>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                                    </Paragraph>
                                </Card_Section>
                                <Card_Section styler={{ kind: 'action-bar', align: 'right' }}>
                                    <Button label="Agree" />
                                    <Button label="Disagree" />
                                </Card_Section>
                            </Card>
                        </Overlay>
                    </Portal>
                </ContentWrap>
            </div>
        );
    }

};

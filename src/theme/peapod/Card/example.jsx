import React from 'react';
import { ContentWrap, Card, Card_Section, Heading, Paragraph, Button, Photo, Icon } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class CardExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <div>
                <ContentWrap>
                    <Card
                        styler={{
                            style: {
                                width: '350px',
                            },
                        }}
                    >
                        <Card_Section
                            styler={{
                                kind: 'media-section',
                            }}
                            mediaTitle={
                                <div>
                                    <Card_Section styler={{ kind: 'title-small' }}>
                                        <Heading kind="h4" styler={{ secondary: true }}>Hello there</Heading>
                                        <Paragraph styler={{ secondary: true }}>Lorem ipsum dolor sit</Paragraph>
                                    </Card_Section>
                                    <Card_Section styler={{ kind: 'action-bar' }}>
                                        <Button label="Agree" />
                                        <Button label="Disagree" />
                                    </Card_Section>
                                </div>
                            }
                        >
                            <Photo
                                src="assets/media/image.png"
                                styler={{
                                    style: {
                                        display: 'block',
                                    },
                                }}
                            />
                        </Card_Section>
                    </Card>

                    <Card
                        styler={{
                            style: {
                                width: '350px',
                            },
                        }}
                    >
                        <Card_Section>
                            <Card_Section styler={{ kind: 'media-area' }}>
                                <Photo src="assets/media/image.png" />
                            </Card_Section>
                            <Card_Section styler={{ kind: 'media-area-icons' }}>
                                <Button
                                    styler={{
                                        type: 'icon',
                                    }}
                                    label={(
                                        <Icon
                                            styler={{
                                                style: {
                                                    lineHeight: 'inherit',
                                                },
                                            }}
                                        >
                                            favorite
                                        </Icon>
                                    )}
                                />

                                <Button
                                    styler={{ type: 'icon' }}
                                    label={(
                                        <Icon
                                            styler={{
                                                style: {
                                                    lineHeight: 'inherit',
                                                },
                                            }}
                                        >
                                            bookmark
                                        </Icon>
                                    )}
                                />

                                <Button
                                    styler={{ type: 'icon' }}
                                    label={(
                                        <Icon styler={{ style: { lineHeight: 'inherit' } }}>get_app</Icon>
                                    )}
                                />
                            </Card_Section>
                        </Card_Section>
                    </Card>

                    <Card
                        styler={{
                            style: {
                                width: '350px',
                            },
                        }}
                    >
                        <Card_Section styler={{ kind: 'media-section' }}>
                            <Photo src="assets/media/image.png" />
                        </Card_Section>

                        <Card_Section styler={{ kind: 'action-bar' }}>
                            <Button
                                styler={{ type: 'icon' }}
                                label={(
                                    <Icon styler={{ style: { lineHeight: 'inherit' } }}>favorite</Icon>
                                )}
                            />

                            <Button
                                styler={{ type: 'icon' }}
                                label={(
                                    <Icon styler={{ style: { lineHeight: 'inherit' } }}>bookmark</Icon>
                                )}
                            />

                            <Button
                                styler={{ type: 'icon' }}
                                label={(
                                    <Icon styler={{ style: { lineHeight: 'inherit' } }}>get_app</Icon>
                                )}
                            />
                        </Card_Section>
                    </Card>

                    <Card styler={{ style: { width: '350px' } }}>
                        <Card_Section styler={{ kind: 'title-supports' }}>
                            <Card_Section styler={{ kind: 'media', float: 'right' }}>
                                <Photo src="assets/media/image.png" styler={{ style: { width: '100px' } }} />
                            </Card_Section>

                            <Heading kind="h5" styler={{ secondary: true }}>Hello there</Heading>
                            <Paragraph styler={{ secondary: true }}>Lorem ipsum dolor sit</Paragraph>
                        </Card_Section>

                        <Card_Section styler={{ kind: 'action-bar' }}>
                            <Button label="Agree" />
                            <Button label="Disagree" />
                        </Card_Section>
                    </Card>

                    <Card styler={{ style: { width: '350px' } }}>
                        <Card_Section styler={{ kind: 'title-supports' }}>

                            <Heading kind="h5" styler={{ secondary: true }}>Hello there</Heading>
                            <Paragraph styler={{ secondary: true }}>Lorem ipsum dolor sit</Paragraph>
                        </Card_Section>

                        <Card_Section>
                            <Paragraph>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </Paragraph>
                        </Card_Section>

                        <Card_Section styler={{ kind: 'action-bar' }}>
                            <Button label="Agree" />
                            <Button label="Disagree" />
                        </Card_Section>
                    </Card>

                    <Card
                        styler={{
                            padded: true,
                            style: {
                                width: '350px',
                            },
                        }}
                        title="Simple Card"
                        actionBar={(
                            <div>
                                <Button
                                    styler={{ type: 'icon' }}
                                    label={(
                                        <Icon styler={{ style: { lineHeight: 'inherit' } }} >
                                            bookmark
                                        </Icon>
                                    )}
                                />
                                <Button
                                    styler={{ type: 'icon' }}
                                    label={(
                                        <Icon styler={{ style: { lineHeight: 'inherit' } }}>
                                            get_app
                                        </Icon>
                                    )}
                                />
                            </div>
                        )}
                    >
                        <Photo src="assets/media/image.png" />
                    </Card>

                    <Card
                        styler={{ style: { width: '350px' } }}
                        actionBar={(
                            <div>
                                <Button
                                    styler={{ type: 'icon' }}
                                    label={(
                                        <Icon styler={{ style: { lineHeight: 'inherit' } }}>favorite</Icon>
                                    )}
                                />
                                <Button
                                    styler={{ type: 'icon' }}
                                    label={(
                                        <Icon styler={{ style: { lineHeight: 'inherit' } }}>get_app</Icon>
                                    )}
                                />
                            </div>
                        )}
                    >
                        <Photo src="assets/media/image.png" />
                    </Card>

                    <Card
                        styler={{
                            padded: true,
                            style: {
                                width: '350px',
                            },
                        }}
                        title="Simple Card"
                        actionBar={(
                            <div>
                                <Button label="Button" />
                                <Button label="Another Button" />
                            </div>
                        )}
                    >
                        <Paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Paragraph>
                    </Card>

                    <Card
                        styler={{
                            padded: true,
                            style: {
                                width: '350px',
                            },
                        }}
                        title="Simple Card"
                    >
                        <Paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Paragraph>
                    </Card>
                </ContentWrap>
            </div>
        );
    }
};

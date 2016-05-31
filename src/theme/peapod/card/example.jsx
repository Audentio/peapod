import React from 'react';
import Pod from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class CardExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <div>
                <Pod.ContentWrap>
                    <Pod.Card
                        styler={{
                            style: {
                                width: '350px',
                            },
                        }}
                    >
                        <Pod.Card_Section
                            styler={{
                                kind: 'media-section',
                            }}
                            mediaTitle={
                                <div>
                                    <Pod.Card_Section styler={{ kind: 'title-small' }}>
                                        <Pod.Heading kind="h4" styler={{ secondary: true }}>Hello there</Pod.Heading>
                                        <Pod.Paragraph styler={{ secondary: true }}>Lorem ipsum dolor sit</Pod.Paragraph>
                                    </Pod.Card_Section>
                                    <Pod.Card_Section styler={{ kind: 'action-bar' }}>
                                        <Pod.Button label="Agree" />
                                        <Pod.Button label="Disagree" />
                                    </Pod.Card_Section>
                                </div>
                            }
                        >
                            <Pod.Photo
                                src="assets/media/image.png"
                                styler={{
                                    style: {
                                        display: 'block',
                                    },
                                }}
                            />
                        </Pod.Card_Section>
                    </Pod.Card>

                    <Pod.Card
                        styler={{
                            style: {
                                width: '350px',
                            },
                        }}
                    >
                        <Pod.Card_Section>
                            <Pod.Card_Section styler={{ kind: 'media-area' }}>
                                <Pod.Photo src="assets/media/image.png" />
                            </Pod.Card_Section>
                            <Pod.Card_Section styler={{ kind: 'media-area-icons' }}>
                                <Pod.Button
                                    styler={{
                                        type: 'icon',
                                    }}
                                    label={(
                                        <Pod.Icon
                                            styler={{
                                                style: {
                                                    lineHeight: 'inherit',
                                                },
                                            }}
                                        >
                                            favorite
                                        </Pod.Icon>
                                    )}
                                />

                                <Pod.Button
                                    styler={{ type: 'icon' }}
                                    label={(
                                        <Pod.Icon
                                            styler={{
                                                style: {
                                                    lineHeight: 'inherit',
                                                },
                                            }}
                                        >
                                            bookmark
                                        </Pod.Icon>
                                    )}
                                />

                                <Pod.Button
                                    styler={{ type: 'icon' }}
                                    label={(
                                        <Pod.Icon styler={{ style: { lineHeight: 'inherit' } }}>get_app</Pod.Icon>
                                    )}
                                />
                            </Pod.Card_Section>
                        </Pod.Card_Section>
                    </Pod.Card>

                    <Pod.Card
                        styler={{
                            style: {
                                width: '350px',
                            },
                        }}
                    >
                        <Pod.Card_Section styler={{ kind: 'media-section' }}>
                            <Pod.Photo src="assets/media/image.png" />
                        </Pod.Card_Section>

                        <Pod.Card_Section styler={{ kind: 'action-bar' }}>
                            <Pod.Button
                                styler={{ type: 'icon' }}
                                label={(
                                    <Pod.Icon styler={{ style: { lineHeight: 'inherit' } }}>favorite</Pod.Icon>
                                )}
                            />

                            <Pod.Button
                                styler={{ type: 'icon' }}
                                label={(
                                    <Pod.Icon styler={{ style: { lineHeight: 'inherit' } }}>bookmark</Pod.Icon>
                                )}
                            />

                            <Pod.Button
                                styler={{ type: 'icon' }}
                                label={(
                                    <Pod.Icon styler={{ style: { lineHeight: 'inherit' } }}>get_app</Pod.Icon>
                                )}
                            />
                        </Pod.Card_Section>
                    </Pod.Card>

                    <Pod.Card styler={{ style: { width: '350px' } }}>
                        <Pod.Card_Section styler={{ kind: 'title-supports' }}>
                            <Pod.Card_Section styler={{ kind: 'media', float: 'right' }}>
                                <Pod.Photo src="assets/media/image.png" styler={{ style: { width: '100px' } }} />
                            </Pod.Card_Section>

                            <Pod.Heading kind="h5" styler={{ secondary: true }}>Hello there</Pod.Heading>
                            <Pod.Paragraph styler={{ secondary: true }}>Lorem ipsum dolor sit</Pod.Paragraph>
                        </Pod.Card_Section>

                        <Pod.Card_Section styler={{ kind: 'action-bar' }}>
                            <Pod.Button label="Agree" />
                            <Pod.Button label="Disagree" />
                        </Pod.Card_Section>
                    </Pod.Card>

                    <Pod.Card styler={{ style: { width: '350px' } }}>
                        <Pod.Card_Section styler={{ kind: 'title-supports' }}>

                            <Pod.Heading kind="h5" styler={{ secondary: true }}>Hello there</Pod.Heading>
                            <Pod.Paragraph styler={{ secondary: true }}>Lorem ipsum dolor sit</Pod.Paragraph>
                        </Pod.Card_Section>

                        <Pod.Card_Section>
                            <Pod.Paragraph>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </Pod.Paragraph>
                        </Pod.Card_Section>

                        <Pod.Card_Section styler={{ kind: 'action-bar' }}>
                            <Pod.Button label="Agree" />
                            <Pod.Button label="Disagree" />
                        </Pod.Card_Section>
                    </Pod.Card>

                    <Pod.Card
                        styler={{
                            padded: true,
                            style: {
                                width: '350px',
                            },
                        }}
                        title="Simple Card"
                        actionBar={(
                            <div>
                                <Pod.Button
                                    styler={{ type: 'icon' }}
                                    label={(
                                        <Pod.Icon styler={{ style: { lineHeight: 'inherit' } }} >
                                            bookmark
                                        </Pod.Icon>
                                    )}
                                />
                                <Pod.Button
                                    styler={{ type: 'icon' }}
                                    label={(
                                        <Pod.Icon styler={{ style: { lineHeight: 'inherit' } }}>
                                            get_app
                                        </Pod.Icon>
                                    )}
                                />
                            </div>
                        )}
                    >
                        <Pod.Photo src="assets/media/image.png" />
                    </Pod.Card>

                    <Pod.Card
                        styler={{ style: { width: '350px' } }}
                        actionBar={(
                            <div>
                                <Pod.Button
                                    styler={{ type: 'icon' }}
                                    label={(
                                        <Pod.Icon styler={{ style: { lineHeight: 'inherit' } }}>favorite</Pod.Icon>
                                    )}
                                />
                                <Pod.Button
                                    styler={{ type: 'icon' }}
                                    label={(
                                        <Pod.Icon styler={{ style: { lineHeight: 'inherit' } }}>get_app</Pod.Icon>
                                    )}
                                />
                            </div>
                        )}
                    >
                        <Pod.Photo src="assets/media/image.png" />
                    </Pod.Card>

                    <Pod.Card
                        styler={{
                            padded: true,
                            style: {
                                width: '350px',
                            },
                        }}
                        title="Simple Card"
                        actionBar={(
                            <div>
                                <Pod.Button label="Button" />
                                <Pod.Button label="Another Button" />
                            </div>
                        )}
                    >
                        <Pod.Paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Pod.Paragraph>
                    </Pod.Card>

                    <Pod.Card
                        styler={{
                            padded: true,
                            style: {
                                width: '350px',
                            },
                        }}
                        title="Simple Card"
                    >
                        <Pod.Paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Pod.Paragraph>
                    </Pod.Card>
                </Pod.ContentWrap>
            </div>
        );
    }
};

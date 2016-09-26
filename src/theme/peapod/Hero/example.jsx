import React from 'react';
import { Hero, Hero_Overlay, Center, Card, Card_Section, Heading, Paragraph, Button } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';


module.exports = class HeroExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <div>
                <Hero key={'hero'} styler={{ cover: true, style: { backgroundImage: 'url(assets/media/bg.jpg)' } }}>
                    <Hero_Overlay styler={{ position: 'left' }}>
                        <Center>
                            <Card styler={{ disguised: true, style: { maxWidth: '500px' } }}>

                                <Card_Section styler={{ kind: 'title-supports' }}>
                                    <Heading kind="h2" styler={{ secondary: true }}>I'm a card in disguise!</Heading>
                                    <Heading kind="h5" styler={{ secondary: true }}>Damion: Add option to look this way to cards</Heading>
                                </Card_Section>
                                <Card_Section styler={{ kind: 'supporting-text' }}>
                                    <Paragraph styler={{ secondary: true }}>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                                        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </Paragraph>
                                </Card_Section>
                                <Card_Section styler={{ kind: 'action-bar' }}>
                                    <Button label="Find Out More" />
                                </Card_Section>
                            </Card>
                        </Center>
                    </Hero_Overlay>
                </Hero>
            </div>
        );
    }

};

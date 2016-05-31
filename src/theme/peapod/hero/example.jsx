import React from 'react';
import Pod from 'utility/components.js';
import PureRender from 'utility/pureRender.js';


module.exports = class HeroExample extends React.Component {

    shouldComponentUpdate = PureRender;
    
    render() {
        return (
            <div>
                <Pod.Hero key={'hero'} styler={{ cover: true, style: { backgroundImage: 'url(assets/media/bg.jpg)' } }}>
                    <Pod.Hero_Overlay styler={{ position: 'left' }}>
                        <Pod.Center>
                            <Pod.Card styler={{ disguised: true, style: { maxWidth: '500px' } }}>

                                <Pod.Card_Section styler={{ kind: 'title-supports' }}>
                                    <Pod.Heading kind="h2" styler={{ secondary: true }}>I'm a card in disguise!</Pod.Heading>
                                    <Pod.Heading kind="h5" styler={{ secondary: true }}>Damion: Add option to look this way to cards</Pod.Heading>
                                </Pod.Card_Section>
                                <Pod.Card_Section styler={{ kind: 'supporting-text' }}>
                                    <Pod.Paragraph styler={{ secondary: true }}>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                                        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </Pod.Paragraph>
                                </Pod.Card_Section>
                                <Pod.Card_Section styler={{ kind: 'action-bar' }}>
                                    <Pod.Button label="Find Out More" />
                                </Pod.Card_Section>
                            </Pod.Card>
                        </Pod.Center>
                    </Pod.Hero_Overlay>
                </Pod.Hero>
            </div>
        );
    }

};

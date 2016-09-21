import React from 'react';
import { Parallax, Parallax_Layer, Center, Heading } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class ParallaxExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <Parallax styler={{ style: { margin: '100vh 0' } }}>
                <Parallax_Layer>
                    <Center>
                        <Heading style={{ style: { color: 'white' } }}>Parallax</Heading>
                    </Center>
                </Parallax_Layer>
                <Parallax_Layer>
                    <Center>
                        <Heading style={{ style: { color: 'white' } }}>Parallax</Heading>
                    </Center>
                </Parallax_Layer>
                <Parallax_Layer>
                    <Center>
                        <Heading style={{ style: { color: 'white' } }}>Parallax</Heading>
                    </Center>
                </Parallax_Layer>

                <Parallax_Layer>
                    <div style={{ width: '100%', height: '100%', backgroundImage: 'url(assets/media/bg2.jpg)', backgroundSize: 'cover', backgroundPosition: 'center center' }}></div>
                </Parallax_Layer>
            </Parallax>
        );
    }
};

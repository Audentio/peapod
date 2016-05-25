import React from 'react';
import Pod from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class ParallaxExample extends React.Component {

	shouldComponentUpdate = PureRender;

    render() {
        return (
            <Pod.Parallax
                background={(
                    <div style={{ width: '100%', height: '100%', backgroundImage: 'url(assets/media/bg2.jpg)', backgroundSize: 'cover', backgroundPosition: 'center center' }}></div>
                )}
            >
                <Pod.Center>
                    <Pod.Heading style={{ style: { color: 'white' } }}>Parallax</Pod.Heading>
                </Pod.Center>
            </Pod.Parallax>
        );
    }
};

import React from 'react'
import Pod from 'components.js'

export default class ParallaxSection extends React.Component {

    render () {
        return (
            <Pod.Parallax background={(<div style={{width:'100%', height: '100%', backgroundImage: 'url(mrRobot.jpg)', backgroundSize: 'cover', backgroundPosition:'center center'}}></div>)}>
                <Pod.Center><Pod.Heading style={{style: {color: 'white'}}}>Parallax</Pod.Heading></Pod.Center>
            </Pod.Parallax>
        )
    }

}

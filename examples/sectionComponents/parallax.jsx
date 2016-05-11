import React from 'react'
import ReactDOM from 'react-dom'
import 'components'
import Paragraph from 'components/paragraph'
import Strong from 'components/strong'
import Code from 'components/code'

export default class ParallaxSection extends React.Component {

    render () {
        return (
            <Pod.parallax background={(<div style={{width:'100%', height: '100%', backgroundImage: 'url(mrRobot.jpg)', backgroundSize: 'cover', backgroundPosition:'center center'}}></div>)}>
                <Pod.center><Pod.heading style={{style: {color: 'white'}}}>Parallax</Pod.heading></Pod.center>
            </Pod.parallax>
        )
    }

}

import React from 'react'
import ReactDOM from 'react-dom'
import 'components'
import Paragraph from 'components/paragraph'
import Strong from 'components/strong'
import Code from 'components/code'

export default class DamionDev extends React.Component {
// ugly but gives me more room to write :)

constructor() {
    super();
}


render () {

var title = (
    <Pod.section>
    <Pod.contentWrap>
    <Pod.heading styler={{secondary: true}}>Development Enviroment</Pod.heading>
    </Pod.contentWrap>
    </Pod.section>
)
var background = (<div style={{width: '100%', height: '100%', background: 'url(mrRobot.jpg)', backgroundSize: 'cover'}}></div>)
return(
    <div key={'dev'}>
        <Pod.datepicker />

        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />

        <Pod.parallax background={(<div style={{width:'100%', height: '100%', backgroundImage: 'url(mrRobot.jpg)', backgroundSize: 'cover', backgroundPosition:'center center'}}></div>)}>
            <Pod.center>
                <Pod.card styler={{padding: true}}>
                    <Pod.heading style={{style: {color: 'white'}}}>Parallax</Pod.heading>
                    <Pod.paragraph> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto aut totam delectus temporibus reiciendis dolorem est accusantium ad laborum. Hic maxime reiciendis ipsum ex error adipisci, ea possimus impedit molestias. </Pod.paragraph>
                </Pod.card>
            </Pod.center>
        </Pod.parallax>

        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
    </div>
)}}
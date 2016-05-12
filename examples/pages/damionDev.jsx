import React from 'react'
import ReactDOM from 'react-dom'
import Pod from 'components.js'

export default class DamionDev extends React.Component {
// ugly but gives me more room to write :)

constructor() {
    super();
    this.state = { showtool: false }

    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
}

onMouseEnter() {
    this.setState({ showtool: true })
}
onMouseLeave() {
    this.setState({ showtool: false })
}

render () {

var title = (
    <Pod.Section>
    <Pod.ContentWrap>
    <Pod.Heading styler={{secondary: true}}>Development Enviroment</Pod.Heading>
    </Pod.ContentWrap>
    </Pod.Section>
)

var background = (<div style={{width: '100%', height: '100%', background: 'url(mrRobot.jpg)', backgroundSize: 'cover'}}></div>)

return(
    <div key={'dev'}>
        <Pod.DatePicker />

        <br /><br /><br />
        <br /><br /><br />

        <Pod.Testimonial name="Damion Yeatman" comp="Theme House" link="http://themehouse.com" img="profile.jpg">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae dolor nostrum inventore molestiae repellendus! Laborum, et, hic. Itaque facilis, nostrum cumque, sapiente numquam aut, error ex eum quos vitae temporibus.
        </Pod.Testimonial>

        <Pod.Testimonial name="Damion Yeatman" comp="Theme House" link="http://themehouse.com">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae dolor nostrum inventore molestiae repellendus! Laborum, et, hic. Itaque facilis, nostrum cumque, sapiente numquam aut, error ex eum quos vitae temporibus.
        </Pod.Testimonial>

        <Pod.Testimonial comp="Theme House">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae dolor nostrum inventore molestiae repellendus! Laborum, et, hic. Itaque facilis, nostrum cumque, sapiente numquam aut, error ex eum quos vitae temporibus.
        </Pod.Testimonial>

        <br /><br /><br />
        <br /><br /><br />

        <div
            style={{position: 'relative', display: 'block', width:'81px', margin: '0 auto', padding: '10px', backgroundColor: '#afafaf'}}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
        >
            Show Tip
            <Pod.Tooltip show={this.state.showtool}>Desktop Right</Pod.Tooltip>
            <Pod.Tooltip show={this.state.showtool} styler={{position: 'top'}}>Desktop Top</Pod.Tooltip>
            <Pod.Tooltip show={this.state.showtool} styler={{mobile: true, position: 'left'}}>Mobile Left</Pod.Tooltip>
            <Pod.Tooltip show={this.state.showtool} styler={{mobile: true, position: 'bottom'}}>Mobile Bottom</Pod.Tooltip>
        </div>

        <br /><br /><br />
        <br /><br /><br />

        <div
            style={{position: 'relative', display: 'block', width:'81px', margin: '0 auto', padding: '10px', backgroundColor: '#afafaf'}}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
        >
            Show Tip
            <Pod.Tooltip show={this.state.showtool} styler={{position: 'top-left'}}>a</Pod.Tooltip>
            <Pod.Tooltip show={this.state.showtool} styler={{position: 'top'}}>b</Pod.Tooltip>
            <Pod.Tooltip show={this.state.showtool} styler={{position: 'top-right'}}>c</Pod.Tooltip>

            <Pod.Tooltip show={this.state.showtool} styler={{position: 'bottom-left'}}>a</Pod.Tooltip>
            <Pod.Tooltip show={this.state.showtool} styler={{position: 'bottom'}}>b</Pod.Tooltip>
            <Pod.Tooltip show={this.state.showtool} styler={{position: 'bottom-right'}}>c</Pod.Tooltip>
        </div>

        <br /><br /><br />

        <Pod.Device trueScaling={true} styler={{style: {display: 'inline-block'}}}>
            <Pod.Lazy distance="50" height="100%">
                <Pod.Embed width="100%" height="100%" src="http://themehouse.com" />Hey
            </Pod.Lazy>
        </Pod.Device>
        <Pod.Device styler={{style: {display: 'inline-block'}}}>
            <Pod.Lazy distance="50" height="100%">
                <Pod.Embed width="100%" height="100%" src="http://themehouse.com" />
            </Pod.Lazy>
        </Pod.Device>
        <Pod.Device trueScaling={true} device="macbook" styler={{style: {display: 'inline-block'}}}>
            <Pod.Lazy distance="50" height="100%">
                <Pod.Embed width="100%" height="100%" src="http://themehouse.com" />
            </Pod.Lazy>
        </Pod.Device>

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

        <Pod.Parallax background={(<div style={{width:'100%', height: '100%', backgroundImage: 'url(mrRobot.jpg)', backgroundSize: 'cover', backgroundPosition:'center center'}}></div>)}>
            <Pod.Center>
                <Pod.Card styler={{padding: true}}>
                    <Pod.Heading style={{style: {color: 'white'}}}>Parallax</Pod.Heading>
                    <Pod.Paragraph> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto aut totam delectus temporibus reiciendis dolorem est accusantium ad laborum. Hic maxime reiciendis ipsum ex error adipisci, ea possimus impedit molestias. </Pod.Paragraph>
                </Pod.Card>
            </Pod.Center>
        </Pod.Parallax>

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
import React from 'react';
// import ReactDOM from 'react-dom';
import Pod from 'components.js';

export default class DamionDev extends React.Component {
// ugly but gives me more room to write :)

    constructor() {
        super();
        this.state = { showtool: false };

        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }

    onMouseEnter() {
        this.setState({ showtool: true });
    }
    onMouseLeave() {
        this.setState({ showtool: false });
    }

    render() {

        // const title = (
        //     <Pod.Section>
        //         <Pod.ContentWrap>
        //             <Pod.Heading styler={{secondary: true}}>Development Enviroment</Pod.Heading>
        //         </Pod.ContentWrap>
        //     </Pod.Section>
        // )

        // const background = (<div style={{width: '100%', height: '100%', background: 'url(mrRobot.jpg)', backgroundSize: 'cover'}}></div>);

        return(
            <div key={'dev'}>
                <Pod.DatePicker />

                <br /><br /><br />
                <br /><br /><br />

                <div style={{ width: '200px', height: '200px', background:'#efefef' }}>
                    <Pod.Center>Hey</Pod.Center>
                </div>

                <br /><br /><br />
                <br /><br /><br />

                <Pod.Scrollable horizontal={true} styler={{center: true}}>
                    <Pod.Device trueScaling={true} orientation='horizontal' styler={{style: {display: 'inline-block'}}}>
                        <Pod.Lazy distance="50" height="100%">
                            <Pod.Photo src="image.png" styler={{ style: { display: 'block' } }}/>
                        </Pod.Lazy>
                    </Pod.Device>

                    <Pod.Device orientation='horizontal' styler={{style: {display: 'inline-block'}}}>
                        <Pod.Lazy distance="50" height="100%">
                            <Pod.Photo src="image.png" styler={{ style: { display: 'block' } }}/>
                        </Pod.Lazy>
                    </Pod.Device>
                    <Pod.Device styler={{style: {display: 'inline-block'}}}>
                        <Pod.Lazy distance="50" height="100%">
                            <Pod.Photo src="image.png" styler={{ style: { display: 'block' } }}/>
                        </Pod.Lazy>
                    </Pod.Device>
                    <Pod.Device trueScaling={true} device="macbook" styler={{style: {display: 'inline-block'}}}>
                        <Pod.Lazy distance="50" height="100%">
                            <Pod.Photo src="image.png" styler={{ style: { display: 'block' } }}/>
                        </Pod.Lazy>
                    </Pod.Device>

                </Pod.Scrollable>

                <br /><br /><br />
                <br /><br /><br />

                <Pod.Center></Pod.Center>

                <Pod.List style="square">
                    <Pod.List_Item>Hey</Pod.List_Item>
                </Pod.List>

                <br /><br /><br />
                <br /><br /><br />

                <Pod.Media figure="profile.jpg" contentVertical='middle'>
                    <Pod.Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam eius illo nostrum voluptates! Porro laborum, temporibus ad molestiae illum doloribus. Magnam minima similique ea, voluptates dolorum quam ad adipisci voluptate.</Pod.Paragraph>
                </Pod.Media>

            </div>
        )
    }
}

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

        return (
            <div key={'dev'}>
                {/*<Pod.DatePicker />

                    <br /><br /><br />
                    <br /><br /><br />

                    <div style={{ width: '200px', height: '200px', background: '#efefef' }}>
                    <Pod.Center>Hey</Pod.Center>
                    </div>

                    <br /><br /><br />
                    <br /><br /><br />

                    <Pod.Droppable window>Droppable</Pod.Droppable>

                    <br /><br /><br />
                <br /><br /><br />*/}

                <Pod.Scrollable horizontal styler={{ center: true }}>
                    <Pod.Device trueScaling orientation="horizontal" styler={{ style: { display: 'inline-block' } }}>
                        <Pod.Lazy distance="50" height="100%">
                            <Pod.Photo src="image.png" styler={{ style: { display: 'block' } }} />
                        </Pod.Lazy>
                    </Pod.Device>

                    <Pod.Device styler={{ style: { display: 'inline-block' } }}>
                        <Pod.Lazy distance="50" height="100%">
                            <Pod.Photo src="image.png" styler={{ style: { display: 'block' } }} />
                        </Pod.Lazy>
                    </Pod.Device>

                    <Pod.Device device="iphone" version={6} variant="spacegrey" trueScaling orientation="horizontal" styler={{ style: { display: 'inline-block' } }}>
                        <Pod.Lazy distance="50" height="100%">
                            <Pod.Photo src="image.png" styler={{ style: { display: 'block' } }} />
                        </Pod.Lazy>
                    </Pod.Device>

                    <Pod.Device trueScaling device="iphone" version={6} variant="spacegrey" styler={{ style: { display: 'inline-block' } }}>
                        <Pod.Lazy distance="50" height="100%">
                            <Pod.Photo src="image.png" styler={{ style: { display: 'block' } }} />
                        </Pod.Lazy>
                    </Pod.Device>

                    <Pod.Device device="iphone" version={6} variant="gold" trueScaling orientation="horizontal" styler={{ style: { display: 'inline-block' } }}>
                        <Pod.Lazy distance="50" height="100%">
                            <Pod.Photo src="image.png" styler={{ style: { display: 'block' } }} />
                        </Pod.Lazy>
                    </Pod.Device>

                    <Pod.Device trueScaling device="iphone" version={6} variant="gold" styler={{ style: { display: 'inline-block' } }}>
                        <Pod.Lazy distance="50" height="100%">
                            <Pod.Photo src="image.png" styler={{ style: { display: 'block' } }} />
                        </Pod.Lazy>
                    </Pod.Device>

                    <Pod.Device device="iphone" version={6} variant="rosegold" trueScaling orientation="horizontal" styler={{ style: { display: 'inline-block' } }}>
                        <Pod.Lazy distance="50" height="100%">
                            <Pod.Photo src="image.png" styler={{ style: { display: 'block' } }} />
                        </Pod.Lazy>
                    </Pod.Device>

                    <Pod.Device trueScaling device="iphone" version={6} variant="rosegold" styler={{ style: { display: 'inline-block' } }}>
                        <Pod.Lazy distance="50" height="100%">
                            <Pod.Photo src="image.png" styler={{ style: { display: 'block' } }} />
                        </Pod.Lazy>
                    </Pod.Device>

                </Pod.Scrollable>

                <Pod.Scrollable horizontal styler={{ center: true }}>

                    <Pod.Device trueScaling device="macbook" styler={{ style: { display: 'inline-block' } }}>
                        <Pod.Lazy distance="50" height="100%">
                            <Pod.Photo src="image.png" styler={{ style: { display: 'block' } }} />
                        </Pod.Lazy>
                    </Pod.Device>

                    <Pod.Device trueScaling device="macbook" variant="silver" styler={{ style: { display: 'inline-block' } }}>
                        <Pod.Lazy distance="50" height="100%">
                            <Pod.Photo src="image.png" styler={{ style: { display: 'block' } }} />
                        </Pod.Lazy>
                    </Pod.Device>


                    <Pod.Device trueScaling device="macbook" variant="gold" styler={{ style: { display: 'inline-block' } }}>
                        <Pod.Lazy distance="50" height="100%">
                            <Pod.Photo src="image.png" styler={{ style: { display: 'block' } }} />
                        </Pod.Lazy>
                    </Pod.Device>

                </Pod.Scrollable>

                <Pod.Scrollable horizontal styler={{ center: true }}>

                    <Pod.Device trueScaling device="macbookpro" styler={{ style: { display: 'inline-block' } }}>
                        <Pod.Lazy distance="50" height="100%">
                            <Pod.Photo src="image.png" styler={{ style: { display: 'block' } }} />
                        </Pod.Lazy>
                    </Pod.Device>

                    <Pod.Device trueScaling device="macbookpro" version="13" variant='2015' styler={{ style: { display: 'inline-block' } }}>
                        <Pod.Lazy distance="50" height="100%">
                            <Pod.Photo src="image.png" styler={{ style: { display: 'block' } }} />
                        </Pod.Lazy>
                    </Pod.Device>

                </Pod.Scrollable>

                <Pod.Scrollable horizontal styler={{ center: true }}>

                    <Pod.Device trueScaling device="imac" styler={{ style: { display: 'inline-block' } }}>
                        <Pod.Lazy distance="50" height="100%">
                            <Pod.Photo src="image.png" styler={{ style: { display: 'block' } }} />
                        </Pod.Lazy>
                    </Pod.Device>

                </Pod.Scrollable>

                <Pod.Scrollable horizontal styler={{ center: true }}>

                    <Pod.Device trueScaling device="ipadpro" styler={{ style: { display: 'inline-block' } }}>
                        <Pod.Lazy distance="50" height="100%">
                            <Pod.Photo src="image.png" styler={{ style: { display: 'block' } }} />
                        </Pod.Lazy>
                    </Pod.Device>
                    <Pod.Device trueScaling device="ipadpro" orientation="horizontal" styler={{ style: { display: 'inline-block' } }}>
                        <Pod.Lazy distance="50" height="100%">
                            <Pod.Photo src="image.png" styler={{ style: { display: 'block' } }} />
                        </Pod.Lazy>
                    </Pod.Device>

                    <Pod.Device trueScaling device="ipadpro" variant="gold" styler={{ style: { display: 'inline-block' } }}>
                        <Pod.Lazy distance="50" height="100%">
                            <Pod.Photo src="image.png" styler={{ style: { display: 'block' } }} />
                        </Pod.Lazy>
                    </Pod.Device>
                    <Pod.Device trueScaling device="ipadpro" variant="gold" orientation="horizontal" styler={{ style: { display: 'inline-block' } }}>
                        <Pod.Lazy distance="50" height="100%">
                            <Pod.Photo src="image.png" styler={{ style: { display: 'block' } }} />
                        </Pod.Lazy>
                    </Pod.Device>

                    <Pod.Device trueScaling device="ipadpro" variant="rosegold" styler={{ style: { display: 'inline-block' } }}>
                        <Pod.Lazy distance="50" height="100%">
                            <Pod.Photo src="image.png" styler={{ style: { display: 'block' } }} />
                        </Pod.Lazy>
                    </Pod.Device>
                    <Pod.Device trueScaling device="ipadpro" variant="rosegold" orientation="horizontal" styler={{ style: { display: 'inline-block' } }}>
                        <Pod.Lazy distance="50" height="100%">
                            <Pod.Photo src="image.png" styler={{ style: { display: 'block' } }} />
                        </Pod.Lazy>
                    </Pod.Device>

                    <Pod.Device trueScaling device="ipadpro" variant="spacegrey" styler={{ style: { display: 'inline-block' } }}>
                        <Pod.Lazy distance="50" height="100%">
                            <Pod.Photo src="image.png" styler={{ style: { display: 'block' } }} />
                        </Pod.Lazy>
                    </Pod.Device>
                    <Pod.Device trueScaling device="ipadpro" variant="spacegrey" orientation="horizontal" styler={{ style: { display: 'inline-block' } }}>
                        <Pod.Lazy distance="50" height="100%">
                            <Pod.Photo src="image.png" styler={{ style: { display: 'block' } }} />
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

                <Pod.Media figure="profile.jpg" contentVertical="middle">
                    <Pod.Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam eius illo nostrum voluptates! Porro laborum, temporibus ad molestiae illum doloribus. Magnam minima similique ea, voluptates dolorum quam ad adipisci voluptate.</Pod.Paragraph>
                </Pod.Media>

            </div>
        );
    }
}

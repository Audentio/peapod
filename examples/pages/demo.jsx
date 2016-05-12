import React from 'react'
import ReactDOM from 'react-dom'
import Pod from 'components.js'

export default class Demo extends React.Component {

    render () {

        return(
            <div key={'demopage'}>
                <Pod.Hero key={'hero'} styler={{cover: true, style: {backgroundImage: 'url(demo/bg.jpg)'}}}>

                    <Pod.ContentWrap>
                        <Pod.Grid>

                            <Pod.Grid_Cell styler={{lg: 6, style: {height:'100vh'} }}>
                                <Pod.Center>
                                    <div style={{textAlign: 'right', color:'white', display: 'inline-block'}}>

                                        <Pod.Heading>My New App</Pod.Heading>
                                        <Pod.Paragraph>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae laudantium fugit repellendus reprehenderit officia! Fugit quia aperiam deleniti, voluptatum similique tempora officia, vitae, minus dicta labore mollitia quasi maiores ipsam!
                                        </Pod.Paragraph>

                                    </div>
                                </Pod.Center>
                            </Pod.Grid_Cell>

                            <Pod.Grid_Cell styler={{lg: 6, style: {height:'100vh'} }}>
                                <Pod.Center>
                                    <Pod.Device trueScaling={true} styler={{style: {display: 'inline-block'}}}>
                                        <Pod.Embed width="100%" height="100%" src="http://themehouse.com" />
                                    </Pod.Device>
                                </Pod.Center>
                            </Pod.Grid_Cell>

                        </Pod.Grid>
                    </Pod.ContentWrap>
                </Pod.Hero>

                <Pod.FixedElement key={'fixednavigation'} styler={{style: {top: 0, left: 0, width: '100%'}}}>
                    <Pod.Toolbar>
                        <Pod.ContentWrap>
                            <Pod.Icon styler={{style: {height: '32px', display: 'inline-block', lineHeight: '32px', width: '32px', float: 'left'}}}>menu</Pod.Icon>
                            <Pod.Button label="Download the app" styler={{style: {float:'right'} }} />


                            <Pod.Button label="Home" styler={{kind: 'general'}} />
                            <Pod.Button label="Blog" styler={{kind: 'general'}} />
                            <Pod.Menu trigger={
                                <Pod.Button label="Downloads" styler={{kind: 'general'}} />
                            } json={[
                                {text: 'Projects', href: '#',
                                    children: [
                                        {text: 'Other Projects', href: '#',
                                            children: [
                                                {text: 'Theme House', href: '#'},
                                                {text: 'Pinto', href: '#'}
                                            ]
                                        },
                                        {text: 'Peapod', href: '#'}
                                    ]
                                },
                                {text: '.Sketch files', href: '#'},
                                {text: 'HTML Templates', href: '#'},
                                {text: 'Wordpress Themes', href: '#'},
                            ]} />
                            <Pod.Button label="About" styler={{kind: 'general'}} />
                            <Pod.Button label="Contact" styler={{kind: 'general'}} />
                        </Pod.ContentWrap>
                    </Pod.Toolbar>
                </Pod.FixedElement>

                <Pod.Section styler={{style: {backgroundColor: '#efefef'}}}>
                    <Pod.ContentWrap>
                    <Pod.Grid>
                        <Pod.Grid_Cell styler={{lg: 6}}>
                            <Pod.Card styler={{style: {padding:'16px'}}}>
                                <Pod.Media image="demo/img.png" alignImage="right" title="A media element">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui ex asperiores rem alias aspernatur quis fugiat eum tempore quaerat.
                                </Pod.Media>
                            </Pod.Card>
                        </Pod.Grid_Cell>
                        <Pod.Grid_Cell styler={{lg: 6}}>
                            <Pod.Card styler={{style: {padding:'16px'}}}>
                                <Pod.Media image="demo/img.png" title="A media element">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui ex asperiores rem alias aspernatur quis fugiat eum tempore quaerat.
                                </Pod.Media>
                            </Pod.Card>
                        </Pod.Grid_Cell>
                        <Pod.Grid_Cell styler={{lg: 6}}>
                            <Pod.Card styler={{style: {padding:'16px'}}}>
                                <Pod.Media image="demo/img.png" alignImage="right" title="A media element">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui ex asperiores rem alias aspernatur quis fugiat eum tempore quaerat.
                                </Pod.Media>
                            </Pod.Card>
                        </Pod.Grid_Cell>
                        <Pod.Grid_Cell styler={{lg: 6}}>
                            <Pod.Card styler={{style: {padding:'16px'}}}>
                                <Pod.Media image="demo/img.png" title="A media element">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui ex asperiores rem alias aspernatur quis fugiat eum tempore quaerat.
                                </Pod.Media>
                            </Pod.Card>
                        </Pod.Grid_Cell>
                        <Pod.Grid_Cell styler={{lg: 6}}>
                            <Pod.Card styler={{style: {padding:'16px'}}}>
                                <Pod.Media image="demo/img.png" alignImage="right" title="A media element">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui ex asperiores rem alias aspernatur quis fugiat eum tempore quaerat.
                                </Pod.Media>
                            </Pod.Card>
                        </Pod.Grid_Cell>
                        <Pod.Grid_Cell styler={{lg: 6}}>
                            <Pod.Card styler={{style: {padding:'16px'}}}>
                                <Pod.Media image="demo/img.png" title="A media element">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui ex asperiores rem alias aspernatur quis fugiat eum tempore quaerat.
                                </Pod.Media>
                            </Pod.Card>
                        </Pod.Grid_Cell>
                    </Pod.Grid>
                    </Pod.ContentWrap>
                </Pod.Section>

                <Pod.Section styler={{style: {backgroundColor: '#000', padding: 0}}}>
                    <Pod.Parallax background={(<div style={{width:'100%', height: '100%', backgroundImage: 'url(demo/bg2.jpg)', backgroundSize: 'cover', backgroundPosition:'center center', opacity: '0.8', }}></div>)}>
                        <Pod.Center styler={{style: {color: 'white'}}}>
                            <Pod.Heading>Works on the New Macbook</Pod.Heading>
                            <Pod.Device trueScaling={true} device="macbook" styler={{style: {display: 'inline-block'}}}>
                                <Pod.Embed width="100%" height="100%" src="http://themehouse.com" />
                            </Pod.Device>
                            <Pod.Device trueScaling={true} variant="gold" device="macbook" styler={{style: {display: 'inline-block'}}}>
                                <Pod.Embed width="100%" height="100%" src="http://themehouse.com" />
                            </Pod.Device>
                        </Pod.Center>
                    </Pod.Parallax>
                </Pod.Section>

                <Pod.Section styler={{style: {backgroundColor: '#927E6B', color: '#fff'}}}>
                    <Pod.ContentWrap>
                        <Pod.Grid>
                            <Pod.Grid_Cell styler={{sm: 12, md:6, lg: 3}}>
                                <Pod.List styler={{mainStyle: {maxHeight: 'auto'}}}>
                                    <Pod.List_Item>Item #1</Pod.List_Item>
                                    <Pod.List_Item>Item #2</Pod.List_Item>
                                    <Pod.List_Item>Item #3</Pod.List_Item>
                                    <Pod.List_Item>Item #4</Pod.List_Item>
                                    <Pod.List_Item>Item #5</Pod.List_Item>
                                </Pod.List>
                            </Pod.Grid_Cell>
                            <Pod.Grid_Cell styler={{sm: 12, md:6, lg: 3}}>
                                <Pod.List styler={{mainStyle: {maxHeight: 'auto'}}}>
                                    <Pod.List_Item>Item #1</Pod.List_Item>
                                    <Pod.List_Item>Item #2</Pod.List_Item>
                                    <Pod.List_Item>Item #3</Pod.List_Item>
                                    <Pod.List_Item>Item #4</Pod.List_Item>
                                    <Pod.List_Item>Item #5</Pod.List_Item>
                                </Pod.List>
                            </Pod.Grid_Cell>
                            <Pod.Grid_Cell styler={{sm: 12, md:6, lg: 3}}>
                                <Pod.List styler={{mainStyle: {maxHeight: 'auto'}}}>
                                    <Pod.List_Item>Item #1</Pod.List_Item>
                                    <Pod.List_Item>Item #2</Pod.List_Item>
                                    <Pod.List_Item>Item #3</Pod.List_Item>
                                    <Pod.List_Item>Item #4</Pod.List_Item>
                                    <Pod.List_Item>Item #5</Pod.List_Item>
                                </Pod.List>
                            </Pod.Grid_Cell>
                            <Pod.Grid_Cell styler={{sm: 12, md:6, lg: 3}}>
                                <Pod.List styler={{mainStyle: {maxHeight: 'auto'}}}>
                                    <Pod.List_Item>Item #1</Pod.List_Item>
                                    <Pod.List_Item>Item #2</Pod.List_Item>
                                    <Pod.List_Item>Item #3</Pod.List_Item>
                                    <Pod.List_Item>Item #4</Pod.List_Item>
                                    <Pod.List_Item>Item #5</Pod.List_Item>
                                </Pod.List>
                            </Pod.Grid_Cell>
                        </Pod.Grid>
                    </Pod.ContentWrap>
                </Pod.Section>

                <Pod.Section>
                    <Pod.ContentWrap>
                        Copyright 2016 &copy; ThemeHouse
                    </Pod.ContentWrap>
                </Pod.Section>
            </div>
        )

    }

}
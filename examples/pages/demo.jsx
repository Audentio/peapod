import React from 'react'
import ReactDOM from 'react-dom'
import Pod from 'components.js'

export default class Demo extends React.Component {
    constructor() {
        super();
        this.state = { value: 0, uniformValue: 0 }
        this.startLoop = this.startLoop.bind(this)
    }

    startLoop(){
        var _this = this;
        this.loop = setInterval(function(){
            var currentValue = _this.state.value;
            _this.setState({
                value: currentValue + Math.floor(Math.random()*10),
                uniformValue: _this.state.uniformValue + 1
            })
            if(_this.state.value >= 100) {
                //clearInterval(_this.loop) //Where's the fun in that?
                _this.setState({
                    value: 0 //GO AGAIN
                })
            }
        }, 3000);
    }

    componentDidMount() {
        this.startLoop()
    }

    render () {

        return(
            <Pod.Pane key={'demopage'}>
                <Pod.Hero key={'hero'} styler={{cover: true, style: {backgroundImage: 'url(demo/bg.jpg)'}}}>

                    <Pod.ContentWrap>
                        <Pod.Grid>
                            <Pod.Grid_Cell styler={{sm: 6, style: {height:'100vh'} }}>
                                <Pod.Center>
                                    <div style={{textAlign: 'right', color:'white', display: 'inline-block'}}>

                                        <Pod.Heading>My New App</Pod.Heading>
                                        <Pod.Paragraph>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae laudantium fugit repellendus reprehenderit officia! Fugit quia aperiam deleniti, voluptatum similique tempora officia, vitae, minus dicta labore mollitia quasi maiores ipsam!
                                        </Pod.Paragraph>

                                    </div>
                                </Pod.Center>
                            </Pod.Grid_Cell>

                            <Pod.Grid_Cell styler={{sm: 6, style: {height:'100vh'} }}>
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

                <Pod.Section styler={{style: {paddingBottom: '0px', border: 'none'}}}>
                    <Pod.ContentWrap>
                        <Pod.Alert dismissable={true} id="generalAlert">
                            We have just updated to some new version <Pod.Anchor to="/demo">Check it out!</Pod.Anchor>
                        </Pod.Alert>
                    </Pod.ContentWrap>
                </Pod.Section>

                <Pod.Section>
                    <Pod.ContentWrap>
                        <Pod.Media figure="profile.jpg" align="right">
                            <Pod.Heading>We Do Stuff</Pod.Heading>
                            <Pod.Paragraph> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, ducimus suscipit aspernatur a nihil nisi repellendus pariatur sapiente, atque inventore accusamus ea ipsum iusto, quaerat mollitia blanditiis odio nobis iure. </Pod.Paragraph>
                            <Pod.Paragraph> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, ducimus suscipit aspernatur a nihil nisi repellendus pariatur sapiente, atque inventore accusamus ea ipsum iusto, quaerat mollitia blanditiis odio nobis iure. </Pod.Paragraph>
                            <Pod.Paragraph> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, ducimus suscipit aspernatur a nihil nisi repellendus pariatur sapiente, atque inventore accusamus ea ipsum iusto, quaerat mollitia blanditiis odio nobis iure. </Pod.Paragraph>
                            <Pod.Paragraph> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, ducimus suscipit aspernatur a nihil nisi repellendus pariatur sapiente, atque inventore accusamus ea ipsum iusto, quaerat mollitia blanditiis odio nobis iure. </Pod.Paragraph>
                        </Pod.Media>
                    </Pod.ContentWrap>
                </Pod.Section>

                <Pod.Section styler={{style: {backgroundColor: '#efefef'}}}>
                    <Pod.ContentWrap>
                    <Pod.Grid>
                        <Pod.Grid_Cell styler={{lg: 6}}>
                            <Pod.Card styler={{style: {padding:'16px'}}}>
                                <Pod.Media figure="demo/img.png" align="right" title="A media element">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui ex asperiores rem alias aspernatur quis fugiat eum tempore quaerat.
                                </Pod.Media>
                            </Pod.Card>
                        </Pod.Grid_Cell>
                        <Pod.Grid_Cell styler={{lg: 6}}>
                            <Pod.Card styler={{style: {padding:'16px'}}}>
                                <Pod.Media figure="demo/img.png" title="A media element">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui ex asperiores rem alias aspernatur quis fugiat eum tempore quaerat.
                                </Pod.Media>
                            </Pod.Card>
                        </Pod.Grid_Cell>
                        <Pod.Grid_Cell styler={{lg: 6}}>
                            <Pod.Card styler={{style: {padding:'16px'}}}>
                                <Pod.Media figure="demo/img.png" align="right" title="A media element">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui ex asperiores rem alias aspernatur quis fugiat eum tempore quaerat.
                                </Pod.Media>
                            </Pod.Card>
                        </Pod.Grid_Cell>
                        <Pod.Grid_Cell styler={{lg: 6}}>
                            <Pod.Card styler={{style: {padding:'16px'}}}>
                                <Pod.Media figure="demo/img.png" title="A media element">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui ex asperiores rem alias aspernatur quis fugiat eum tempore quaerat.
                                </Pod.Media>
                            </Pod.Card>
                        </Pod.Grid_Cell>
                        <Pod.Grid_Cell styler={{lg: 6}}>
                            <Pod.Card styler={{style: {padding:'16px'}}}>
                                <Pod.Media figure="demo/img.png" align="right" title="A media element">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui ex asperiores rem alias aspernatur quis fugiat eum tempore quaerat.
                                </Pod.Media>
                            </Pod.Card>
                        </Pod.Grid_Cell>
                        <Pod.Grid_Cell styler={{lg: 6}}>
                            <Pod.Card styler={{style: {padding:'16px'}}}>
                                <Pod.Media figure="demo/img.png" title="A media element">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui ex asperiores rem alias aspernatur quis fugiat eum tempore quaerat.
                                </Pod.Media>
                            </Pod.Card>
                        </Pod.Grid_Cell>
                    </Pod.Grid>
                    </Pod.ContentWrap>
                </Pod.Section>

                <Pod.Section>
                    <Pod.ContentWrap styler={{style:{textAlign: 'center'}}}>
                        <Pod.Card styler={{style:{width: '350px'}}} actionBar={(
                            <div>
                                <Pod.Button styler={{type: 'icon'}} label={
                                        (<Pod.Icon styler={{ style: { lineHeight: 'inherit' } }}>favorite</Pod.Icon>)
                                    } />

                                <Pod.Button styler={{type: 'icon'}} label={
                                    (<Pod.Icon styler={{ style: { lineHeight: 'inherit' } }}>get_app</Pod.Icon>)
                                } />
                            </div>
                        )}>
                            <Pod.Photo src="image.png"/>
                        </Pod.Card>

                        <Pod.Card styler={{padded:true, style:{width: '350px'}}} title="Simple Card" actionBar={(
                            <div>
                                <Pod.Button label="Button" />

                                <Pod.Button label="Another Button" />
                            </div>
                        )}>
                            <Pod.Chip>JavaScript</Pod.Chip>
                            <Pod.Chip>JSON</Pod.Chip>
                            <br />
                            <br />
                            Posted <Pod.Timestamp time={1455670800} output="relative" />
                            <Pod.Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Pod.Paragraph>
                        </Pod.Card>

                        <Pod.Card styler={{padded:true, style:{width: '350px'}}} title="Some CSS">
                            <Pod.CodeBlock styler={{style: {overflow:'scroll'}}}>{`
@import url('print.css');
@page:right {
 margin: 1cm 2cm 1.3cm 4cm;
}

@font-face {
  font-family: Chunkfive; src: url('Chunkfive.otf');
}

div.text,
#content,
li[lang=ru] {
  font: Tahoma, Chunkfive, sans-serif;
  background: url('hatch.png') /* wtf? */;  color: #F0F0F0 !important;
  width: 100%;
}`}</Pod.CodeBlock>
                        </Pod.Card>
                        <Pod.Card styler={{padded:true, style:{width: '350px'}}} title="Shopping List">
                            <Pod.List>
                                <Pod.List_Item>Milk</Pod.List_Item>
                                <Pod.List_Item>Eggs</Pod.List_Item>
                                <Pod.List_Item>Bacon</Pod.List_Item>
                                <Pod.List_Item>Coffee</Pod.List_Item>
                            </Pod.List>
                        </Pod.Card>
                        <Pod.Card styler={{padded:true, style:{width: '350px', textAlign: 'center'}}} title="Fund Raiser Progress">
                            <Pod.CircularProgress styler={{size:150}} value={this.state.uniformValue}>
                                <div style={{fontSize: 30, fontWeight: 200}}>{this.state.uniformValue}%</div>
                                <span style={{color: '#aaa'}}>progress...</span>
                            </Pod.CircularProgress>
                            <Pod.Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Pod.Paragraph>
                        </Pod.Card>

                        <Pod.Card styler={{padded:true, style:{width: '350px', textAlign: 'center'}}} title="Don't forget to sign up to our Email">
                            <Pod.Input placeholder="Your Name" />
                            <Pod.Input placeholder="Your Email" type="email" validate={true} />
                            <Pod.Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Pod.Paragraph>
                        </Pod.Card>
                    </Pod.ContentWrap>
                </Pod.Section>

                <Pod.Section styler={{style: {backgroundColor: '#000', padding: '0px',border: 'none'}}}>
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

                <Pod.Section styler={{style: {backgroundColor: '#efefef', border: 'none', textAlign: 'center'}}}>
                    <Pod.ContentWrap>

                        <Pod.Heading>What our customers say</Pod.Heading>

                        <Pod.Grid>
                            <Pod.Grid_Cell styler={{sm: 12, lg: 6}}>
                                <Pod.Card styler={{style: {padding:'32px 16px'}}}>
                                    <Pod.Testimonial img="profile.jpg" name="Damion Yeatman">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur laborum officiis eum dolores eius a maiores temporibus odit adipisci quis beatae voluptas, expedita molestias voluptatum illum porro consequuntur voluptate et.
                                    </Pod.Testimonial>
                                </Pod.Card>
                            </Pod.Grid_Cell>
                            <Pod.Grid_Cell styler={{sm: 12, lg: 6}}>
                                <Pod.Card styler={{style: {padding:'32px 16px'}}}>
                                    <Pod.Testimonial img="profile.jpg" name="Damion Yeatman">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur laborum officiis eum dolores eius a maiores temporibus odit adipisci quis beatae voluptas, expedita molestias voluptatum illum porro consequuntur voluptate et.
                                    </Pod.Testimonial>
                                </Pod.Card>
                            </Pod.Grid_Cell>
                        </Pod.Grid>

                    </Pod.ContentWrap>
                </Pod.Section>

                <Pod.Section styler={{style: {backgroundColor: '#594E99', color: '#fff', border: 'none'}}}>
                    <Pod.ContentWrap>
                        <Pod.Grid>
                            <Pod.Grid_Cell styler={{sm: 12, md:6, lg: 3, style: {padding: '0px 16px'}}}>
                                <Pod.Heading kind="h5">Some Links</Pod.Heading>
                                <Pod.List styler={{mainStyle: {maxHeight: 'auto'}}}>
                                    <Pod.List_Item>Item #1</Pod.List_Item>
                                    <Pod.List_Item>Item #2</Pod.List_Item>
                                    <Pod.List_Item>Item #3</Pod.List_Item>
                                    <Pod.List_Item>Item #4</Pod.List_Item>
                                    <Pod.List_Item>Item #5</Pod.List_Item>
                                </Pod.List>
                            </Pod.Grid_Cell>
                            <Pod.Grid_Cell styler={{sm: 12, md:6, lg: 3, style: {padding: '0px 16px'}}}>
                                <Pod.Heading kind="h5">Some More Links</Pod.Heading>
                                <Pod.List styler={{mainStyle: {maxHeight: 'auto'}}}>
                                    <Pod.List_Item>Item #1</Pod.List_Item>
                                    <Pod.List_Item>Item #2</Pod.List_Item>
                                    <Pod.List_Item>Item #3</Pod.List_Item>
                                    <Pod.List_Item>Item #4</Pod.List_Item>
                                    <Pod.List_Item>Item #5</Pod.List_Item>
                                </Pod.List>
                            </Pod.Grid_Cell>
                            <Pod.Grid_Cell styler={{sm: 12, md:6, lg: 3, style: {padding: '0px 16px'}}}>
                                <Pod.Heading kind="h5">You Guesed It</Pod.Heading>
                                <Pod.List styler={{mainStyle: {maxHeight: 'auto'}}}>
                                    <Pod.List_Item>Item #1</Pod.List_Item>
                                    <Pod.List_Item>Item #2</Pod.List_Item>
                                    <Pod.List_Item>Item #3</Pod.List_Item>
                                    <Pod.List_Item>Item #4</Pod.List_Item>
                                    <Pod.List_Item>Item #5</Pod.List_Item>
                                </Pod.List>
                            </Pod.Grid_Cell>
                            <Pod.Grid_Cell styler={{sm: 12, md:6, lg: 3, style: {padding: '0px 16px'}}}>
                                <Pod.Heading kind="h5">Even More Links</Pod.Heading>
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
            </Pod.Pane>
        )

    }

}
import React from 'react'
import 'peapod/components'
import Paragraph from 'peapod/components/paragraph'
import Strong from 'peapod/components/strong'
import Code from 'peapod/components/code'

var sections = []
sections.push(
	<Pod.hero key={'hero'} styler={{cover: true, style: {backgroundImage: 'url(mrRobot.jpg)'}}}>
		<Pod.heroOverlay styler={{position:'left'}}>
			<Pod.center>
				<Pod.card styler={{disguised: true, style:{maxWidth: '500px'}}}>

					<Pod.cardSection styler={{kind:'title-supports'}}>
						<Pod.heading kind="h2" styler={{secondary: true}}>I'm a card in disguese!</Pod.heading>
						<Pod.heading kind="h5" styler={{secondary: true}}>Damion: Add option to look this way to cards</Pod.heading>
					</Pod.cardSection>
					<Pod.cardSection styler={{kind:'supporting-text'}}>
						<Pod.paragraph styler={{secondary: true}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Pod.paragraph>
					</Pod.cardSection>
					<Pod.cardSection styler={{kind:'action-bar'}}>
						<Pod.button label="Find Out More" />
					</Pod.cardSection>
				</Pod.card>
			</Pod.center>
		</Pod.heroOverlay>
	</Pod.hero>
)

sections.push(
	<div className="section" key={'grid5'}>
		<Pod.heading>Grid Example (Not Working)</Pod.heading>
		<Pod.grid>
			<Pod.gridCell styler={{xs:6}}>
				Bars
			</Pod.gridCell>

			<Pod.grid styler={{xs:6}}>
				Circles
			</Pod.grid>

			<Pod.div styler={{style: {flex: '0 0 50%'}}}>
				test
			</Pod.div>

			<Pod.div key="1" styler={{style: {':hover': {color: 'red'}}}}>Testing</Pod.div>
			<Pod.div key="2" style={{':hover': {color: 'red'}}}>Testing</Pod.div>
			<div key="3" style={{':hover': {color: 'red'}}}>Testing</div>
		</Pod.grid>
	</div>
)
sections.push(
	<div className="section" key={'chips'}>
		<Pod.heading>Chips</Pod.heading>
		<Pod.chip>This is a chip</Pod.chip>
		<Pod.chip del={true}>Chip with Delete</Pod.chip>
		<Pod.chip photo='profile@2x.jpg'>Chip with Photo</Pod.chip>
		<Pod.chip del={true} photo='profile@2x.jpg'>Chip with Delete & Photo</Pod.chip>
	</div>
)

sections.push(
	<Pod.fixedElement key={'fixed navigation'} styler={{style: {top: 0, left: 0, width: '100%'}}}>

		<Pod.toolbar key={'toolbar'}>
			<Pod.icon styler={{style: {height: '32px', display: 'inline-block', lineHeight: '32px', width: '32px', float: 'left'}}}>menu</Pod.icon>

			Fixed, Toolbar with icon and a &nbsp;

			<Pod.menu trigger={
					<Pod.button label="Button with Dropdown" />
				}>
				<Pod.menuItem href="#" subtext="1">
					Something about something
				</Pod.menuItem>
				<Pod.menuItem href="#" subtext="2">Something else</Pod.menuItem>
				<Pod.menuItem href="#" subtext="3">Another thing</Pod.menuItem>
				<Pod.menuItem href="#" subtext="4">Yet another thing</Pod.menuItem>
				<Pod.menu styler={{level:1}} trigger={
						<Pod.menuItem subtext={
								<Pod.icon styler={{style:{ fontSize: '0.9em' }}}>keyboard_arrow_right</Pod.icon>
							}>And another</Pod.menuItem>
						}>
						<Pod.menuItem href="#">Another thing</Pod.menuItem>
						<Pod.menuItem href="#">Yet another thing</Pod.menuItem>
						<Pod.menuItem href="#">And another</Pod.menuItem>
						<Pod.menu styler={{level:1, left: true}} trigger={
								<Pod.menuItem subtext={
										<Pod.icon styler={{style:{ fontSize: '0.9em' }}}>keyboard_arrow_right</Pod.icon>
									}>And another</Pod.menuItem>
								}>
								<Pod.menuItem href="#">Another thing</Pod.menuItem>
								<Pod.menuItem href="#">Yet another thing</Pod.menuItem>
								<Pod.menuItem href="#">And another</Pod.menuItem>
							</Pod.menu>
						</Pod.menu>
					</Pod.menu>
				</Pod.toolbar>

			</Pod.fixedElement>
		)

		sections.push(
			<div className="section" key={'menu'}>

				<Pod.heading>Menus</Pod.heading>

				<Pod.menu trigger={
						<Pod.button label="On Hover" />
					}>
					<Pod.menuItem href="#" subtext="1">
						Something about something
					</Pod.menuItem>
					<Pod.menuItem href="#" subtext="2">Something else</Pod.menuItem>
					<Pod.menuItem href="#" subtext="3">Another thing</Pod.menuItem>
					<Pod.devider></Pod.devider>
					<Pod.menuItem href="#" subtext="4">Yet another thing</Pod.menuItem>
					<Pod.menu styler={{level:1}} trigger={
							<Pod.menuItem subtext="5">And another</Pod.menuItem>
						}>
						<Pod.menuItem href="#">Another thing</Pod.menuItem>
						<Pod.menuItem href="#">Yet another thing</Pod.menuItem>
						<Pod.menuItem href="#">And another</Pod.menuItem>
						<Pod.menu styler={{level:1}} trigger={
								<Pod.menuItem subtext="5">And another</Pod.menuItem>
							}>
							<Pod.menuItem href="#">Another thing</Pod.menuItem>
							<Pod.menuItem href="#">Yet another thing</Pod.menuItem>
							<Pod.menuItem href="#">And another</Pod.menuItem>
						</Pod.menu>
					</Pod.menu>
				</Pod.menu>

				<Pod.menu portal={true} trigger={
						<Pod.button label="On Click" />
					}>
					<Pod.menuItem href="#" subtext="1">
						Something about something
					</Pod.menuItem>
					<Pod.menuItem href="#" subtext="2">Something else</Pod.menuItem>
					<Pod.menuItem href="#" subtext="3">Another thing</Pod.menuItem>
					<Pod.menuItem href="#" subtext="4">Yet another thing</Pod.menuItem>
					<Pod.menu styler={{level:1}} click={true} trigger={
							<Pod.menuItem subtext="5">And another</Pod.menuItem>
						}>
						<Pod.menuItem href="#">Another thing</Pod.menuItem>
						<Pod.menuItem href="#">Yet another thing</Pod.menuItem>
						<Pod.menuItem href="#">And another</Pod.menuItem>
						<Pod.menu click={true} styler={{level:1}} trigger={
								<Pod.menuItem subtext="5">And another</Pod.menuItem>
							}>
							<Pod.menuItem href="#">Another thing</Pod.menuItem>
							<Pod.menuItem href="#">Yet another thing</Pod.menuItem>
							<Pod.menuItem href="#">And another</Pod.menuItem>
						</Pod.menu>
					</Pod.menu>
				</Pod.menu>

				<Pod.menu trigger={
						<Pod.button label="On Hover from JSON" />
					} json={[
						{text: 'Hello World', href: '#'},
						{text: 'Hello World 36', href: '#',
							children: [
								{text: 'Hello World 387', href: '#'},
								{text: 'Hello World 123', href: '#', subtext: '2'}
							]
						},
						{text: 'Hello World 387', href: '#'},
						{text: 'Hello World 123', href: '#', subtext: '2'}
					]} />

				</div>
			)

			sections.push(
				<div className="section" key={'modals'}>

					<Pod.heading>Modals, Overlays and Centers</Pod.heading>

					<Pod.portal trigger={
							<Pod.button label="Modal, Overlay and Center" />
						} closeOnEsc={true} noArrow={true}>
						<Pod.modal>
							<Pod.heading kind="h2">Heading2 test</Pod.heading>
							<Pod.paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Pod.paragraph>
							<Pod.button label="You are a cabbage" styler={{kind:'primary'}} />
						</Pod.modal>
					</Pod.portal>

					<Pod.portal trigger={
							<Pod.button label="Button, Overlay and Center" />
						} closeOnEsc={true} noArrow={true}>
						<Pod.overlay>
							<Pod.button label="You are a cabbage" styler={{kind:'primary'}} />
						</Pod.overlay>
					</Pod.portal>



					<Pod.portal trigger={
							<Pod.button label="Card, Overlay and Center" />
						} closeOnEsc={true} noArrow={true}>
						<Pod.overlay>
							<Pod.card styler={{style:{width: '350px'}}}>

								<Pod.cardSection styler={{kind:'title-supports'}}>
									<Pod.heading kind="h5" styler={{secondary: true}}>Hello there</Pod.heading>
								</Pod.cardSection>
								<Pod.cardSection styler={{kind:'supporting-text'}}>
									<Pod.paragraph styler={{secondary: true}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</Pod.paragraph>
								</Pod.cardSection>
								<Pod.cardSection styler={{kind:'action-bar', align: 'right'}}>
									<Pod.button label="Agree" />
									<Pod.button label="Disagree" />
								</Pod.cardSection>
							</Pod.card>
						</Pod.overlay>
					</Pod.portal>
				</div>
			)


			sections.push(
				<div className="section grey" key={'card'}>
					<Pod.heading>Cards</Pod.heading>
					<Pod.card styler={{style:{width: '350px'}}}>
						<Pod.cardSection styler={{kind:'media-section'}} mediaTitle={
								<div>
									<Pod.cardSection styler={{kind:'title-small'}}>
										<Pod.heading kind="h4" styler={{secondary: true}}>Hello there</Pod.heading>
										<Pod.paragraph styler={{secondary: true}}>Lorem ipsum dolor sit</Pod.paragraph>
									</Pod.cardSection>

									<Pod.cardSection styler={{kind:'action-bar'}}>
										<Pod.button label="Agree" />
										<Pod.button label="Disagree" />
									</Pod.cardSection>
								</div>
							}>
							<Pod.photo src="image.png" styler={{ style: { display: 'block' } }}/>
						</Pod.cardSection>

					</Pod.card>

					<Pod.card styler={{style:{width: '350px'}}}>
						<Pod.cardSection>
							<Pod.cardSection styler={{kind:'media-area'}}>
								<Pod.photo src="image.png"/>
							</Pod.cardSection>
							<Pod.cardSection styler={{kind:'media-area-icons'}}>
								<Pod.button styler={{type: 'icon'}} label={
										(<Pod.icon styler={{ style: { lineHeight: 'inherit' } }}>favorite</Pod.icon>)
									} />

									<Pod.button styler={{type: 'icon'}} label={
											(<Pod.icon styler={{ style: { lineHeight: 'inherit' } }}>bookmark</Pod.icon>)
										} />

										<Pod.button styler={{type: 'icon'}} label={
												(<Pod.icon styler={{ style: { lineHeight: 'inherit' } }}>get_app</Pod.icon>)
											} />
										</Pod.cardSection>
									</Pod.cardSection>
								</Pod.card>

								<Pod.card styler={{style:{width: '350px'}}}>
									<Pod.cardSection styler={{kind:'media-section'}}>
										<Pod.photo src="image.png"/>
									</Pod.cardSection>

									<Pod.cardSection styler={{kind:'action-bar'}}>
										<Pod.button styler={{type: 'icon'}} label={
												(<Pod.icon styler={{ style: { lineHeight: 'inherit' } }}>favorite</Pod.icon>)
											} />

											<Pod.button styler={{type: 'icon'}} label={
													(<Pod.icon styler={{ style: { lineHeight: 'inherit' } }}>bookmark</Pod.icon>)
												} />

												<Pod.button styler={{type: 'icon'}} label={
														(<Pod.icon styler={{ style: { lineHeight: 'inherit' } }}>get_app</Pod.icon>)
													} />
												</Pod.cardSection>

											</Pod.card>

											<Pod.card styler={{style:{width: '350px'}}}>
												<Pod.cardSection styler={{kind:'title-supports'}}>
													<Pod.cardSection styler={{kind:'media', float: 'right'}}>
														<Pod.photo src="image.png" styler={{style:{width: '100px'}}}/>
													</Pod.cardSection>

													<Pod.heading kind="h5" styler={{secondary: true}}>Hello there</Pod.heading>
													<Pod.paragraph styler={{secondary: true}}>Lorem ipsum dolor sit</Pod.paragraph>
												</Pod.cardSection>

												<Pod.cardSection styler={{kind:'action-bar'}}>
													<Pod.button label="Agree" />
													<Pod.button label="Disagree" />
												</Pod.cardSection>
											</Pod.card>

											<Pod.card styler={{style:{width: '350px'}}}>
												<Pod.cardSection styler={{kind:'title-supports'}}>

													<Pod.heading kind="h5" styler={{secondary: true}}>Hello there</Pod.heading>
													<Pod.paragraph styler={{secondary: true}}>Lorem ipsum dolor sit</Pod.paragraph>
												</Pod.cardSection>

												<Pod.cardSection>
													<Pod.paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Pod.paragraph>
												</Pod.cardSection>

												<Pod.cardSection styler={{kind:'action-bar'}}>
													<Pod.button label="Agree" />
													<Pod.button label="Disagree" />
												</Pod.cardSection>
											</Pod.card>
										</div>
									)

									sections.push(
										<div className="section grey" key={"simplecards"}>

											<Pod.heading>Simple Cards</Pod.heading>

											<Pod.card styler={{padded:true, style:{width: '350px'}}} title="Simple Card" actionBar={(
													<div>
														<Pod.button styler={{type: 'icon'}} label={
																(<Pod.icon styler={{ style: { lineHeight: 'inherit' } }}>bookmark</Pod.icon>)
															} />

															<Pod.button styler={{type: 'icon'}} label={
																	(<Pod.icon styler={{ style: { lineHeight: 'inherit' } }}>get_app</Pod.icon>)
																} />
															</div>
														)}>
														<Pod.photo src="image.png"/>
													</Pod.card>

													<Pod.card styler={{style:{width: '350px'}}} actionBar={(
															<div>
																<Pod.button styler={{type: 'icon'}} label={
																		(<Pod.icon styler={{ style: { lineHeight: 'inherit' } }}>favorite</Pod.icon>)
																	} />

																	<Pod.button styler={{type: 'icon'}} label={
																			(<Pod.icon styler={{ style: { lineHeight: 'inherit' } }}>get_app</Pod.icon>)
																		} />
																	</div>
																)}>
																<Pod.photo src="image.png"/>
															</Pod.card>

															<Pod.card styler={{padded:true, style:{width: '350px'}}} title="Simple Card" actionBar={(
																	<div>
																		<Pod.button label="Button" />

																		<Pod.button label="Another Button" />
																	</div>
																)}>
																<Pod.paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Pod.paragraph>
															</Pod.card>

															<Pod.card styler={{padded:true, style:{width: '350px'}}} title="Simple Card">
																<Pod.paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Pod.paragraph>
															</Pod.card>

														</div>
													)

													sections.push(
														<div className="section grey" key={"lists"}>

															<Pod.heading>Lists</Pod.heading>

															<Pod.card styler={{style:{width: '350px'}}}>

																<Pod.cardSection styler={{kind:'title-small'}}>
																	<Pod.heading kind="h6" styler={{secondary: true}}>Alternating List</Pod.heading>
																</Pod.cardSection>


																<Pod.list>
																	<Pod.listItem
																		image={'image.png'}
																		icon={'star_border'}
																		secondary={"Something something"}

																		styler={{image: 'right', icon: 'left', divider: 'right'}}
																		onClick={(event)=>{console.log("List Item Clicked")}}
																		onIconClick={()=>{console.log("List Item Button Clicked")}}
																		>
																		Item #1
																	</Pod.listItem>
																	<Pod.listItem image={'image.png'} icon={'star_border'} secondary={"Something something"} styler={{divider: 'left'}}>
																		Item #2
																	</Pod.listItem>
																	<Pod.listItem image={'image.png'} icon={'star_border'} secondary={"Something something"} styler={{image: 'right', icon: 'left', divider: 'right'}}>
																		Item #3
																	</Pod.listItem>
																	<Pod.listItem image={'image.png'} icon={'star_border'} secondary={"Something something"} styler={{divider: 'left'}}>
																		Item #4
																	</Pod.listItem>
																	<Pod.listItem image={'image.png'} icon={'star_border'} secondary={"Something something"} styler={{image: 'right', icon: 'left', divider: 'right'}}>
																		Item #5
																	</Pod.listItem>
																</Pod.list>

															</Pod.card>
															<Pod.card styler={{style:{width: '350px'}}}>

																<Pod.cardSection styler={{kind:'title-small'}}>
																	<Pod.heading kind="h6" styler={{secondary: true}}>Standard list with secondary text</Pod.heading>
																</Pod.cardSection>

																<Pod.list>
																	<Pod.listItem secondary={"Something something"}>
																		Item #1
																	</Pod.listItem>
																	<Pod.listItem secondary={"Something something"}>
																		Item #2
																	</Pod.listItem>
																	<Pod.listItem secondary={"Something something"}>
																		Item #3
																	</Pod.listItem>
																	<Pod.listItem secondary={"Something something"}>
																		Item #4
																	</Pod.listItem>
																	<Pod.listItem secondary={"Something something"}>
																		Item #5
																	</Pod.listItem>
																</Pod.list>

															</Pod.card>
															<Pod.card styler={{style:{width: '350px'}}}>

																<Pod.cardSection styler={{kind:'title-small'}}>
																	<Pod.heading kind="h6" styler={{secondary: true}}>List with images</Pod.heading>
																</Pod.cardSection>

																<Pod.list>
																	<Pod.listItem image={'image.png'} styler={{imgSize: 'small'}}>Item #1</Pod.listItem>
																	<Pod.listItem image={'image.png'} styler={{imgSize: 'small'}}>Item #2</Pod.listItem>
																	<Pod.listItem image={'image.png'} styler={{imgSize: 'small'}}>Item #3</Pod.listItem>
																	<Pod.listItem image={'image.png'} styler={{imgSize: 'small'}}>Item #4</Pod.listItem>
																	<Pod.listItem image={'image.png'} styler={{imgSize: 'small'}}>Item #5</Pod.listItem>
																</Pod.list>

															</Pod.card>
															<Pod.card styler={{style:{width: '350px'}}}>

																<Pod.cardSection styler={{kind:'title-small'}}>
																	<Pod.heading kind="h6" styler={{secondary: true}}>List with large images</Pod.heading>
																</Pod.cardSection>

																<Pod.list>
																	<Pod.listItem image={'image.png'} styler={{imgSize: 'large'}}>Item #1</Pod.listItem>
																	<Pod.listItem image={'image.png'} styler={{imgSize: 'large'}}>Item #2</Pod.listItem>
																	<Pod.listItem image={'image.png'} styler={{imgSize: 'large'}}>Item #3</Pod.listItem>
																	<Pod.listItem image={'image.png'} styler={{imgSize: 'large'}}>Item #4</Pod.listItem>
																	<Pod.listItem image={'image.png'} styler={{imgSize: 'large'}}>Item #5</Pod.listItem>
																</Pod.list>

															</Pod.card>
															<Pod.card styler={{style:{width: '350px'}}}>

																<Pod.cardSection styler={{kind:'title-small'}}>
																	<Pod.heading kind="h6" styler={{secondary: true}}>List with icons</Pod.heading>
																</Pod.cardSection>

																<Pod.list>
																	<Pod.listItem icon={'star_border'}>Item #1</Pod.listItem>
																	<Pod.listItem icon={'star_border'}>Item #2</Pod.listItem>
																	<Pod.listItem icon={'star_border'}>Item #3</Pod.listItem>
																	<Pod.listItem icon={'star_border'}>Item #4</Pod.listItem>
																	<Pod.listItem icon={'star_border'}>Item #5</Pod.listItem>
																</Pod.list>
															</Pod.card>

														</div>
													)

													//Section: Forms
													sections.push(
														<div className="section" key={'forms'}>
															<Pod.heading>Forms</Pod.heading>

															<Paragraph>Placeholder can by styled with <Code>placeholderStyle</Code> styler prop</Paragraph>
															<Pod.input placeholder="Styled placeholders" styler={{placeholderStyle: {color: 'red', opacity: '.4', textDecoration: 'underline'}}}/> <br />

															<Paragraph>Basic Input types</Paragraph>
															<Pod.input placeholder="text" styler={{scene:'material'}} /> <br />
															<Pod.input placeholder="password" type="password" styler={{scene:'material'}} /> <br />
															<Pod.input placeholder="number" type="number" styler={{scene:'material'}} /> <br />
															<Paragraph>URL: Protocol <Code>http</Code> is added <Code>onBlur</Code> if none specificed</Paragraph>
															<Pod.input placeholder="URL (http(s)/ftp)" type="url" styler={{scene:'material'}} validate validationResponse={{invalid: 'Not a valid URL', valid: 'way to go!'}} /> <br />

															<br />

															<Paragraph><Strong>Validation</Strong>: doesn't run until blur. Thereafter it runs <Code>onChange</Code></Paragraph>

															<Pod.input placeholder="email (required)" type="email" required validate /> <br />
															<Pod.input placeholder="email (optional)" type="email" styler={{scene:'material'}} validate /> <br />
															<br />



															<Pod.checkbox kind="primary" checked={true} />

															<br /><br />

															<Paragraph>Radio</Paragraph>
															<div>
																<Pod.radio id="ra1" group="group1" label="item 1" />
																<Pod.radio id="ra2" group="group1" label="item 2" />
																<Pod.radio id="ra3" group="group1" label="item 3" />
																<Pod.radio id="ra4" group="group1" label="item 4" />
															</div>
															<Pod.hr styler={{style:{width:100,margin: '15px 0'}}} />
															<div>
																<Pod.radio group="group2" label="item A" />
																<Pod.radio group="group2" label="item B" />
																<Pod.radio group="group2" label="item C" />
																<Pod.radio group="group2" label="item D" />
															</div>

														</div>
													)

													//Section: Buttons
													sections.push(
														<div className="section" key={'buttons'}>
															<Pod.heading>Buttons</Pod.heading>

															<Pod.button label="Default" />
															<Pod.button label="Primary" styler={{kind:'primary'}} />
															<Pod.button label="Success" styler={{kind:'success'}} />
															<Pod.button label="Danger" styler={{kind:'danger'}} />
															<Pod.button label="Warning" styler={{kind:'warning'}} />

															<br /><br />
															<Pod.button label="Raised" styler={{kind: "primary", raised: true}} />
															<Pod.button label="Round" styler={{kind: "primary", round: true}} />
															<Pod.button label="Disabled" styler={{kind:"primary", disabled: true}} />
															<Pod.button styler={{kind: "success", round:true, raised: true}} />
															<Pod.button styler={{kind: "base"}} onClick={function(){alert('test')}} label="onClick handler" />
															<Pod.button styler={{kind: "base"}} href="http://peapod.io" label="Anchor/Link" kind="primary" />
														</div>
													)


													var rand = function(factor = 100){
														return Math.floor(Math.random()*factor)
													}

													var ProgressExamples = React.createClass({
														getInitialState: function(){ return {bars: [], circles: []}},

														types: ['base','primary','info','success','danger','warning','secondary'],

														getRandom: function(){
															var bars = [], circles = [];
															this.types.forEach(function(type){
																var random = rand();
																bars.push(<Pod.progress key={type} value={rand()} styler={{kind:type}} />)
																circles.push(<Pod.circularProgress key={type+'_circ'} value={random} styler={{kind:type, style:{marginLeft: 15}}}><span style={{color:'#aaa'}}>{random}</span></Pod.circularProgress>)
															})
															this.setState({bars: bars, circles: circles})
														},

														nuts: false,
														goNuts: function(e){
															e.preventDefault();
															if(this.nuts){
																clearInterval(this.nuts);
																this.nuts = false;
															} else {
																var _this = this;
																_this.nuts = setInterval(function(){
																	_this.getRandom()
																}, 200)
															}
														},

														componentDidMount: function(){
															this.getRandom();
														},

														render: function(){
															return (
																<div key="something" onClick={this.getRandom}>
																	<p style={{marginBottom: '8px'}}><strong>Examples: </strong>Click on these to randomize [or <a href="#" onClick={this.goNuts}>Go nuts</a>]</p>

																	<Pod.grid>
																		<Pod.gridCell styler={{lg:6}}>
																			{this.state.bars}
																		</Pod.gridCell>

																		<Pod.gridCell styler={{lg:6}}>
																			{this.state.circles}
																		</Pod.gridCell>
																	</Pod.grid>
																</div>
															);
														}
													})

													var Progressing = React.createClass({
														getInitialState: function(){
															return {
																value: 0,
																uniformValue: 0,
																btnText: 'pause'
															}
														},
														loop: false,
														uLoop: false,
														startLoop: function(){
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
															}, 500);
															this.uLoop = setInterval(function(){
																_this.setState({
																	uniformValue: _this.state.uniformValue + 1
																})
																if(_this.state.uniformValue >= 100) {
																	_this.setState({
																		uniformValue: 0 //GO AGAIN
																	})
																}
															}, 200);
														},
														toggleLoop: function(e){
															e.preventDefault();
															if(this.loop) {
																clearInterval(this.loop)
																this.loop = false
																clearInterval(this.uLoop)
																this.uLoop = false
																this.setState({ btnText: 'resume' })
															} else {
																this.startLoop()
																this.setState({ btnText: 'pause' })
															}
														},
														componentDidMount: function(){
															this.startLoop();
														},
														componentWillUnmount: function(){
															clearInterval(this.loop)
															clearInterval(this.uLoop)
															this.loop = false
															this.uLoop = false
														},
														render: function(){
															return (
																<div>
																	<p style={{marginBottom: '8px'}}>Natural progression example [<a href="#" onClick={this.toggleLoop}>{this.state.btnText}</a>]</p>
																	<Pod.progress value={this.state.value} />
																	<br />
																	<Pod.circularProgress styler={{size:150}} value={this.state.value}>
																		<div style={{fontSize: 30, fontWeight: 200}}>{this.state.value}%</div>
																		<span style={{color: '#aaa'}}>progress...</span>
																	</Pod.circularProgress>
																	&nbsp;&nbsp;&nbsp;&nbsp;
																	<Pod.circularProgress styler={{size:150, kind:'success'}} value={this.state.uniformValue}>
																		<div style={{fontSize: 26}}>${this.state.uniformValue*13}</div>
																		<span style={{color: '#aaa'}}>Dollas!</span>
																	</Pod.circularProgress>
																	&nbsp;&nbsp;&nbsp;&nbsp;
																	<Pod.circularProgress styler={{size:150, kind:'danger'}} value={this.state.uniformValue}>
																		<span style={{color: '#aaa'}}>{this.state.uniformValue*3} bats</span>
																	</Pod.circularProgress>
																</div>
															);
														}
													});

													sections.push(
														<div className="section" key="Progress">
															<Pod.heading>Progress</Pod.heading>

															<ProgressExamples />

															<br />

															<p style={{marginBottom: '8px'}}>Different strokes (styler prop)</p>
															<Pod.grid>
																<Pod.gridCell styler={{lg:6}}>
																	<Pod.progress styler={{kind:'info', stroke: 2}} value={rand()} />
																	<Pod.progress styler={{kind:'info', stroke: 8}} value={rand()} />
																	<Pod.progress styler={{kind:'info', stroke: 12}} value={rand()} />
																</Pod.gridCell>

																<Pod.gridCell styler={{lg:6}}>
																	<Pod.circularProgress styler={{kind:'danger', stroke: 2, style:{marginLeft: 15}}} value={rand()} />
																	<Pod.circularProgress styler={{kind:'danger', stroke: 8, style:{marginLeft: 15}}} value={rand()} />
																	<Pod.circularProgress styler={{kind:'danger', stroke: 12, style:{marginLeft: 15}}} value={rand()} />
																</Pod.gridCell>
															</Pod.grid>

															<br /> <Progressing /> <br />

															<p style={{marginBottom: '8px'}}>Indeterminate (No props passed. value defaults to -1 which renders indeterminate progress)</p>
															<Pod.progress styler={{kind:'danger'}} />
														</div>
													)

													var imageStyle = {width:'200px',height:'200px'};
													sections.push(
														<div className="section" key="Photo">
															<Pod.heading>Photo</Pod.heading>
															<Pod.photo src="image.png" styler={{style:imageStyle}} lightboxAnimation={false} caption="lightbox without animation" />
															&nbsp;
															<Pod.photo src="image.png" styler={{style:imageStyle}} lightbox={false} caption="lightbox disabled" hidpiData={[ ['1.5','-mySuffix'] ]} />
															&nbsp;
															<Pod.photo src="image.png" styler={{style:imageStyle}} hidpiData={[ ['1.5','@2x'], ['2','@3x'] ]} caption="pixelDensity > 2 : @3x" />
															&nbsp;
															<Pod.photo src="image.png" styler={{style:imageStyle}} alt="Default suffix" hidpiData={false} caption="HiDPI disabled" />
														</div>
													);

													//Section: Icons
													sections.push(
														<div className="section" key={'icons'}>
															<Pod.heading>Icons</Pod.heading>

															<h2>Size & color</h2>
															<p>Currently simply a layer of abstration over google material icons</p>
															<span style={{fontSize: '24px'}}>
																<Pod.icon>home</Pod.icon>&nbsp;
																	<Pod.icon styler={{color: "#07ADD4"}}>assessment</Pod.icon>&nbsp;
																		<Pod.icon styler={{color: "#3F70E2"}}>polymer</Pod.icon>&nbsp;
																			<Pod.icon styler={{color: "#D53FD6"}}>question_answer</Pod.icon>&nbsp;
																				<Pod.icon styler={{color: "#FF6044"}}>whatshot</Pod.icon>
																			</span>

																		</div>
																	)

																	//Alerts
																	var restoreAlerts = function(){
																		for(var item in localStorage){
																			if(item.indexOf('Pod_alert_')>=0){
																				localStorage.removeItem(item);
																				var name = item.split('Pod_alert_')[1].split('_hidden')[0];
																			}

																			window.location.reload()
																		}
																	}
																	sections.push(
																		<div className="section" key={'Alerts'}>
																			<Pod.heading>Alerts</Pod.heading>
																			<p><Pod.button onClick={restoreAlerts} label="Restore all alerts" /></p>
																			<Pod.alert dismissable={true} id="generalAlert">Jim quickly realized that the beautiful gowns are expensive.</Pod.alert>
																			<Pod.alert styler={{kind: 'info'}} dismissable={true} id="infoAlert">Jim quickly realized that the beautiful gowns are expensive.</Pod.alert>
																			<Pod.alert styler={{kind: 'success'}} dismissable={true} id="successAlert">Jim quickly realized that the beautiful gowns are expensive.</Pod.alert>
																			<Pod.alert styler={{kind: 'warning'}} dismissable={true} id="warningAlert">Jim quickly realized that the beautiful gowns are expensive.</Pod.alert>
																			<Pod.alert styler={{kind: 'danger'}} dismissable={true} id="dangerAlert">Jim quickly realized that the beautiful gowns are expensive.</Pod.alert>
																		</div>
																	)

																	// Notifications
																	//================================
																	var restoreNotifs = function(){
																		for(var item in localStorage){
																			if(item.indexOf('Pod_notification_')>=0){
																				localStorage.removeItem(item);
																				var name = item.split('Pod_notification_')[1].split('_hidden')[0];
																			}

																			window.location.reload()
																		}
																	}
																	sections.push(
																		<div className="section" key={"notifications"}>
																			<Pod.heading>Notifications</Pod.heading>

																			<p><Pod.button onClick={restoreNotifs} label="Restore all notifications" /></p>

																			<Pod.notification dismissable={true} id="notif_base">Hello there!</Pod.notification>
																			<Pod.notification dismissable={true} title="Long notification!" styler={{kind: "danger"}} id="notif_danger">
																				Twelve ziggurats quickly jumped a finch box Twelve ziggurats quickly jumped a finch box Twelve ziggurats quickly jumped a finch box
																			</Pod.notification>
																			<Pod.notification dismissable={true} title="Long notification!" styler={{kind: "info"}} id="notif_info">
																				Twelve ziggurats quickly jumped a finch box Twelve ziggurats quickly jumped a finch box Twelve ziggurats quickly jumped a finch box
																			</Pod.notification>
																			<Pod.notification dismissable={true} title="Long notification!" styler={{kind: "warning"}} id="notif_warning">
																				Twelve ziggurats quickly jumped a finch box Twelve ziggurats quickly jumped a finch box Twelve ziggurats quickly jumped a finch box
																			</Pod.notification>
																			<Pod.notification dismissable={true} title="Long notification!" styler={{kind: "success"}} id="notif_success">
																				Twelve ziggurats quickly jumped a finch box Twelve ziggurats quikly jumped a finch box Twelve ziggurats quickly jumped a finch box
																			</Pod.notification>
																		</div>
																	)

																	//Section: Microcomponents
																	sections.push(
																		<div className="section" key={'microcomponents'}>
																			<Pod.heading>Microcomponents</Pod.heading>

																			<h2>Timestamps</h2>
																			Page loaded <Pod.timestamp time={new Date().toISOString()} /> (updates automatically)<br />
																		2005 was <Pod.timestamp time={new Date("Thu, 05 Apr 2005 05:05:05 GMT")} />
																</div>
															)

															sections.push(
																<div className="section" key="labels">
																	<Pod.heading>Label</Pod.heading>
																	<Pod.label icon="settings" styler={{
																			kind: 'success',
																			disabled: true,
																			round: true
																		}}>Test Label</Pod.label>
																	</div>
																)

																var codeExample__javascript = `function $initHighlight(block, flags) {
																	try {
																		if (block.className.search(/\bno\-highlight\b/) != -1)
																		return processBlock(block.function, true, 0x0F) + ' class=""';
																	} catch (e) {
																		/* handle exception */
																		var e4x =
																		<div>Example
																			<p>1234</p></div>;
																			}
																			for (var i = 0 / 2; i < classes.length; i++) { // "0 / 2" should not be parsed as regexp
																				if (checkCondition(classes[i]) === undefined)
																				return /\d+[\s/]/g;
																			}
																			console.log(Array.every(classes, Boolean));
																		}`;
																		var codeExample__css = `
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
																		}`;
																		var codeExample__cpp = `#include <iostream>
																		#define IABS(x) ((x) < 0 ? -(x) : (x))

																		int main(int argc, char *argv[]) {

																			/* An annoying "Hello World" example */
																			for (auto i = 0; i < 0xFFFF; i++)
																			cout << "Hello, World!" << endl;

																			char c = '\n';
																			unordered_map <string, vector<string> > m;
																			m["key"] = "\\\\"; // this is an error

																			return -2e3 + 12l;
																		}`;
																		var codeExample__python = `@requires_authorization
																		def somefunc(param1='', param2=0):
																		r'''A docstring'''
																		if param1 > param2: # interesting
																		print 'Gre\'ater'
																		return (param2 - param1 + 1 + 0b10l) or None

																		class SomeClass:
																		pass

																		>>> message = '''interpreter
																		... prompt'''`;

																		sections.push(
																			<div className="section" key={'Typography'}>
																				<Pod.heading>Typography</Pod.heading>
																				<Pod.heading kind="h4">Paragraph</Pod.heading>
																				<Pod.paragraph>
																					This is a paragraph. This is a paragraph. This is a paragraph.
																					This is a paragraph. This is a paragraph. This is a paragraph.
																					This is a paragraph. This is a paragraph. This is a paragraph.
																					This is a paragraph. This is a paragraph. This is a paragraph.
																					This is a paragraph. This is a paragraph. This is a paragraph.
																					This is a paragraph. This is a paragraph.
																					Text <Code>Inline code</Code> text
																				</Pod.paragraph>

																				<Pod.heading kind="h4">Code</Pod.heading>

																				<Pod.codeBlock language="javascript">{codeExample__javascript}</Pod.codeBlock>
																				<Pod.codeBlock>{codeExample__css}</Pod.codeBlock>
																				<Pod.codeBlock>{codeExample__cpp}</Pod.codeBlock>
																				<Pod.codeBlock>{codeExample__python}</Pod.codeBlock>

																				<Pod.heading kind="h4">Horizontal Rule</Pod.heading>
																				<Pod.hr height="1" />

																				<Pod.heading kind="h4">Headings</Pod.heading>

																				<Pod.heading kind="h1">Headings 1</Pod.heading>
																				<Pod.paragraph>Testing line heights for headings</Pod.paragraph>

																				<Pod.heading kind="h2">Headings 2</Pod.heading>
																				<Pod.paragraph>Testing line heights for headings</Pod.paragraph>

																				<Pod.heading kind="h3">Headings 3</Pod.heading>
																				<Pod.paragraph>Testing line heights for headings</Pod.paragraph>

																				<Pod.heading kind="h4">Headings 4</Pod.heading>
																				<Pod.paragraph>Testing line heights for headings</Pod.paragraph>

																				<Pod.heading kind="h5">Headings 5</Pod.heading>
																				<Pod.paragraph>Testing line heights for headings</Pod.paragraph>

																				<Pod.heading kind="h6">Headings 6</Pod.heading>
																				<Pod.paragraph>Testing line heights for headings</Pod.paragraph>

																			</div>
																		)

																		var tabs = [
																			{
																				trigger: "tab 1",
																				content: "Tab 1 content",
																			},
																			{
																				trigger: "tab 2",
																				content: "Tab 2 content"
																			}
																		]

																		sections.push(
																			<Pod.section key="test">
																				<Pod.tabs tabs={tabs} activeTab={1}></Pod.tabs>
																				<Pod.div>Testing</Pod.div>
																			</Pod.section>
																		)

																		var Sections = React.createClass({
																			render(){
																				return(
																					<div>
																						{sections}
																						<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
																						<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
																						<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
																						<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
																						<Pod.photo src="mrRobot.jpg" lazy={true} caption="Lazy load!" hidpiData={false} />
																					</div>
																				)
																			}
																		})

																		export default Sections

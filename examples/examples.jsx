import React from 'react'
import ReactDOM from 'react-dom'

import _ from 'lodash'

//Peapod
import Pod_core from 'peapod/core';
import Pod_timestamp from 'peapod/timestamp';
import Pod_button from 'peapod/button';
import Pod_image from 'peapod/image';
import Pod_icon from 'peapod/icon';
import Pod_input from 'peapod/forms/input';
import Pod_checkbox from 'peapod/forms/checkbox';
import Pod_section from 'peapod/section';
import Pod_external from 'peapod/external';
import { Pod_animation } from 'peapod/animation'

var sections = [];

class Testcomponent extends React.Component{
	render() {
		return(
			<div>HOLwA {this.props.test}</div>
		)
	}
};


//section: Buttons
sections.push(
	<div className="section" key={'buttons'}>
		<h1>Buttons</h1>

		<Pod_button label="Default" />
		<Pod_button label="Primary" kind="primary" />
		<Pod_button label="Success" kind="success" />
		<Pod_button label="Danger" kind="danger" />
		<Pod_button label="Warning" kind="warning" />

		<br /><br />
		<Pod_button onClick={function(){alert('test')}} label="onClick handler" />
		<Pod_button href="http://peapod.io" label="Anchor/Link" kind="primary" />
		<Pod_button style={{color:'white', backgroundColor: 'purple', borderRadius: '2px 20px 2px 20px', fontWeight: 'bold', ':hover':{borderRadius: '20px 2px 20px 2px'}}} label="Custom" kind="default" />
		<Pod_button label="Raised" kind="primary" raised={true} />
		<Pod_button label="Round" kind="primary" round={true} />
		<Pod_button label="Disabled" kind="primary" disabled={true} />
		<Pod_button kind="success" round={true} raised={true} />

	</div>
)

//Section: Forms
sections.push(
	<div className="section" key={'forms'}>
		<h1>Forms</h1>

		<h2>Text input</h2>
		<Pod_input placeholder="Placeholder..." />
		<Pod_checkbox kind="primary" checked={true} />
	</div>
)

//Section: Icons
sections.push(
	<div className="section" key={'icons'}>
		<h1>Icons</h1>

		<h2>Size & color</h2>
		<p>Currently simply a layer of abstration over google material icons</p>
		<span style={{fontSize: '24px'}}>
			<Pod_icon>home</Pod_icon>&nbsp;
			<Pod_icon color="#07ADD4">assessment</Pod_icon>&nbsp;
			<Pod_icon color="#3F70E2">polymer</Pod_icon>&nbsp;
			<Pod_icon color="#D53FD6">question_answer</Pod_icon>&nbsp;
			<Pod_icon color="#FF6044">whatshot</Pod_icon>
		</span>

	</div>
)


//Compose animateable button with Pod_animation HOC
//Pod_icon is already composed with it


var AnimatedButton = Pod_animation(Pod_button);
var AnimatedInput = Pod_animation(Pod_input);

sections.push(
	<div className="section" key={'Animation'}>
		<h1>Animation</h1>
		<p>Animated components composed with Pod_animation HOC</p>
		<p><code>animation</code> prop [rotate, rotate_acw, pulse]</p>

		<AnimatedButton label="BouncyButton" style={{backgroundColor: 'indianred'}} animation="bounce, .7s" />
		<AnimatedInput value="Crazy input" animation="pulse, .4s" />

		<br />

		<span style={{fontSize: '24px'}}>
			<Pod_icon animation="rotate">autorenew</Pod_icon>&nbsp;
			<Pod_icon animation="rotate,.4s">autorenew</Pod_icon>&nbsp;
			<Pod_icon animation="pulse">grade</Pod_icon><br />
			<Pod_icon animation="pulse,1s" color="red" style={{fontSize: '48px'}}>warning</Pod_icon>&nbsp;
			<Pod_icon animation="pulse,.4s" color="red" style={{fontSize: '48px'}}>play_circle_filled</Pod_icon>
		</span>

		<p>
			<Pod_icon animation="rotate,5s" style={{color: '#3947FF', marginRight: '-9px', animationDelay: '.3s', position: 'relative', top: '-6px', fontSize: '40px'}}>settings</Pod_icon>
			<Pod_icon animation="rotate_acw,5s" style={{fontSize: '48px', color: '#EA4343'}}>settings</Pod_icon>
		</p>
	</div>
)

var imageStyle = {width:'200px',height:'200px'};

//Section: Microcomponents
sections.push(
	<div className="section" key={'microcomponents'}>
		<h1>Microcomponents</h1>

		<h2>Timestamps</h2>
		Page loaded <Pod_timestamp time={new Date().toISOString()} /><br />
		2005 was <Pod_timestamp time={new Date("Thu, 05 Apr 2005 05:05:05 GMT")} />

		<h2>Image</h2>
		<p>(lazy load example below button test)</p>
		<Pod_image src="image.jpg" lightbox-animation={false} caption="lightbox without animation" style={imageStyle} />
		&nbsp;
		<Pod_image src="image.jpg" lightbox={false} caption="lightbox disabled" style={imageStyle} hidpi-data={[ ['1.5','-mySuffix'] ]} />
		&nbsp;
		<Pod_image src="image.jpg" style={imageStyle} hidpi-data={[ ['1.5','@2x'], ['2','@3x'] ]} alt="Custom suffix" caption="Loads image@3x.jpg for pixeDensity 2 or higher" />
		&nbsp;
		<Pod_image src="image.jpg" style={imageStyle} alt="Default suffix" hidpi-data={false} caption="who needs HiDPI anyway?" />
	</div>
)



/*******************
 * STRAIN TEST
 * Increase {repeatCount} till your browser chokes
 * why? The dark overlord commands so
 *******************/

//Rpeat button markup for performance test
var repeatCount = 5,
ButtonTest = [],

customStyleTest = {
	transitionDuration: '0s',
	borderRadius: 0,
	marginBottom: 1,
	marginRight: 1,

	':hover' : { backgroundColor: 'red' }
};
for(var x=0; x<repeatCount; x++){
	ButtonTest.push( <Pod_button style={customStyleTest} kind="primary" key={x} /> );
}



/* This is where everything comes together */

var examples_render = ReactDOM.render(
	<div>
	
		{sections}
		<Pod_section varSet='pastel' title='Pastel Variable Section Test' >
			<Pod_button label="Default"/>
			<Pod_button label="Primary" kind="primary"/>
			<Pod_button label="Success" kind="success"/>
			<Pod_button label="Danger" kind="danger"/>
			<Pod_button label="Warning" kind="warning"/>
		</Pod_section>
		<Pod_section title='Normal Variable Section Test' >
			<Pod_button label="Default"/>
			<Pod_button label="Primary" kind="primary"/>
			<Pod_button label="Success" kind="success"/>
			<Pod_button label="Danger" kind="danger"/>
			<Pod_button label="Warning" kind="warning"/>
		</Pod_section>
		<Pod_section varSet='neon' title='Neon Variable Section Test' >
			<Pod_button label="Default"/>
			<Pod_button label="Primary" kind="primary"/>
			<Pod_button label="Success" kind="success"/>
			<Pod_button label="Danger" kind="danger"/>
			<Pod_button label="Warning" kind="warning"/>
		</Pod_section>
		<div style={{textAlign:'center'}}><br />{ButtonTest}</div>
		<br />
		<Pod_image src="http://h.fastcompany.net/multisite_files/fastcompany/poster/2015/06/3047491-poster-p-1-go-behind-the-scenes-of-mr-robot-usa-networks-timely-new-hacker-drama.jpg" lazy={true} caption="Lazy load!" hidpi-data={false} />	
		<Pod_section varSet='pastel' title='Pastel Variable Section Test' >
			<Pod_button label="Default"/>
			<Pod_button label="Primary" kind="primary"/>
			<Pod_button label="Success" kind="success"/>
			<Pod_button label="Danger" kind="danger"/>
			<Pod_button label="Warning" kind="warning"/>
		</Pod_section>
		<Pod_section title='Normal Variable Section Test' >
			<Pod_button label="Default"/>
			<Pod_button label="Primary" kind="primary"/>
			<Pod_button label="Success" kind="success"/>
			<Pod_button label="Danger" kind="danger"/>
			<Pod_button label="Warning" kind="warning"/>
		</Pod_section>
		<Pod_section varSet='neon' title='Neon Variable Section Test' >
			<Pod_button label="Default"/>
			<Pod_button label="Primary" kind="primary"/>
			<Pod_button label="Success" kind="success"/>
			<Pod_button label="Danger" kind="danger"/>
			<Pod_button label="Warning" kind="warning"/>
		</Pod_section>

		<Pod_external getID="externalContent" />
	</div>
	, document.getElementById('mainContainer')
);


/*
ReactDOM.render(
	<div>
		<Pod_section varSet='neon' title='Neon Variable Section Test' >
			<Pod_button label="Default"/>
			<Pod_button label="Primary" kind="primary"/>
			<Pod_button label="Success" kind="success"/>
			<Pod_button label="Danger" kind="danger"/>
			<Pod_button label="Warning" kind="warning"/>
		</Pod_section>
	</div>
	, document.getElementById('mainContainer')
);
*/

/*
ReactDOM.render(
	<div>
		<Pod_section title='Variable Section Test' >
			<Pod_button label="Default"/>
			<Pod_button label="Primary" kind="primary"/>
		</Pod_section>
	</div>
	, document.getElementById('mainContainer')
);
*/
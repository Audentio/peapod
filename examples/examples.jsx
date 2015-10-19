import React from 'react';
import ReactDOM from 'react-dom';

import _ from 'lodash';

//Peapod
import Pea_core from 'components/core';
import Pea_timestamp from 'components/timestamp';
import Pea_button from 'components/button';
import Pea_image from 'components/image';
import Pea_icon from 'components/icon';
import Pea_input from 'components/forms/input';
import Pea_checkbox from 'components/forms/checkbox';
import Pea_section from 'components/section';

var sections = [];
var buttonStyle = {marginRight: '10px'};

//section: Buttons
sections.push(
	<div className="section" key={'buttons'}>
		<h1>Buttons</h1>
		
		<Pea_button label="Default" style={buttonStyle} />
		<Pea_button label="Primary" kind="primary" style={buttonStyle} />
		<Pea_button label="Success" kind="success" style={buttonStyle} />
		<Pea_button label="Danger" kind="danger" style={buttonStyle} />
		<Pea_button label="Warning" kind="warning" style={buttonStyle} />
		<br /><br />
		<Pea_button onClick={function(){alert('test')}} label="onClick handler" />
		<Pea_button href="http://peapod.io" label="Anchor/Link" kind="primary" />
		<Pea_button style={{color:'white', backgroundColor: 'purple', borderRadius: '2px 20px 2px 20px', fontWeight: 'bold', ':hover':{borderRadius: '20px 2px 20px 2px'}}} label="Custom" kind="default" />
		<Pea_button label="Raised" kind="primary" raised={true} />
		<Pea_button label="Round" kind="primary" round={true} />
		<Pea_button label="Disabled" kind="primary" disabled={true} />
		<Pea_button kind="success" round={true} raised={true} />

	</div>
)

//Section: Forms
sections.push(
	<div className="section" key={'forms'}>
		<h1>Forms</h1>
		
		<h2>Text input</h2>
		<Pea_input placeholder="Placeholder..." />
		<Pea_checkbox kind="primary" checked={true} />
	</div>
)

//Section: Icons
sections.push(
	<div className="section" key={'icons'}>
		<h1>Icons</h1>

		<h2>Size & color</h2>
		<p>Currently simply a layer of abstration over google material icons</p>
		<span style={{fontSize: '24px'}}>
			<Pea_icon>home</Pea_icon>&nbsp;
			<Pea_icon color="#07ADD4">assessment</Pea_icon>&nbsp;
			<Pea_icon color="#3F70E2">polymer</Pea_icon>&nbsp;
			<Pea_icon color="#D53FD6">question_answer</Pea_icon>&nbsp;
			<Pea_icon color="#FF6044">whatshot</Pea_icon>
		</span>

		<h2>Animation</h2>
		<p><code>animation</code> prop [rotate, rotate_acw, pulse]</p>
		<span style={{fontSize: '24px'}}>
			<Pea_icon animation="rotate">autorenew</Pea_icon>&nbsp;
			<Pea_icon animation="rotate,.4s">autorenew</Pea_icon>&nbsp;
			<Pea_icon animation="pulse">grade</Pea_icon><br />
			<Pea_icon animation="pulse,1s" color="red" style={{fontSize: '48px'}}>warning</Pea_icon>&nbsp;
			<Pea_icon animation="pulse,.4s" color="red" style={{fontSize: '48px'}}>play_circle_filled</Pea_icon>
		</span>

		<p>
			<Pea_icon animation="rotate,5s" style={{color: '#3947FF', marginRight: '-9px', animationDelay: '.3s', position: 'relative', top: '-6px', fontSize: '40px'}}>settings</Pea_icon>
			<Pea_icon animation="rotate_acw,5s" style={{fontSize: '48px', color: '#EA4343'}}>settings</Pea_icon>
		</p>

	</div>
)

var imageStyle = {width:'200px',height:'200px'};

//Section: Microcomponents
sections.push(
	<div className="section" key={'microcomponents'}>
		<h1>Microcomponents</h1>
		
		<h2>Timestamps</h2>
		Page loaded <Pea_timestamp time={new Date().toISOString()} /><br />
		2005 was <Pea_timestamp time={new Date("Thu, 05 Apr 2005 05:05:05 GMT")} />

		<h2>Image</h2>
		<p>(lazy load example below button test)</p>
		<Pea_image src="image.jpg" style={imageStyle} alt="Default suffix" caption="This is caption" />
		&nbsp;
		<Pea_image src="image.jpg" lightbox={false} caption="lightbox disabled" style={imageStyle} hidpi-data={[ ['1.5','-mySuffix'] ]} />
		&nbsp;
		<Pea_image src="image.jpg" style={imageStyle} hidpi-data={[ ['1.5','@2x'], ['2','@3x'] ]} alt="Custom suffix" caption="Loads image@3x.jpg for pixeDensity 2 or higher" />
		&nbsp;
		<Pea_image src="image.jpg" style={imageStyle} alt="Default suffix" hidpi-data={false} caption="who needs HiDPI anyway?" />
	</div>
)



/*******************
 * STRAIN TEST 
 * Increase {repeatCount} till your browser chokes
 * why? The dark overlord commands so
 *******************/

//Rpeat button markup for performance test
var repeatCount = 405,
ButtonTest = [],

customStyleTest = {
	transitionDuration: '0s',
	borderRadius: 0,
	marginBottom: 1,
	marginRight: 1,
	
	':hover' : { backgroundColor: 'red' }
};
for(var x=0; x<repeatCount; x++){
	ButtonTest.push( <Pea_button style={customStyleTest} kind="primary" key={x} /> );
}



/* This is where everything comes together */
ReactDOM.render(
	<div>
		{sections}
		<Pea_section vars='pastel' title='Pastel Variable Section Test' >
			<Pea_button label="Default"/>
			<Pea_button label="Primary" kind="primary"/>
			<Pea_button label="Success" kind="success"/>
			<Pea_button label="Danger" kind="danger"/>
			<Pea_button label="Warning" kind="warning"/>
		</Pea_section>
		<Pea_section title='Normal Variable Section Test' >
			<Pea_button label="Default"/>
			<Pea_button label="Primary" kind="primary"/>
			<Pea_button label="Success" kind="success"/>
			<Pea_button label="Danger" kind="danger"/>
			<Pea_button label="Warning" kind="warning"/>
		</Pea_section>
		<Pea_section vars='neon' title='Neon Variable Section Test' >
			<Pea_button label="Default"/>
			<Pea_button label="Primary" kind="primary"/>
			<Pea_button label="Success" kind="success"/>
			<Pea_button label="Danger" kind="danger"/>
			<Pea_button label="Warning" kind="warning"/>
		</Pea_section>
		<div style={{textAlign:'center'}}><br />{ButtonTest}</div>
		<br />
		<Pea_image src="http://h.fastcompany.net/multisite_files/fastcompany/poster/2015/06/3047491-poster-p-1-go-behind-the-scenes-of-mr-robot-usa-networks-timely-new-hacker-drama.jpg" lazy={true} caption="Lazy load!" hidpi-data={false} />
		
		<Pea_section vars='pastel' title='Pastel Variable Section Test' >
			<Pea_button label="Default"/>
			<Pea_button label="Primary" kind="primary"/>
			<Pea_button label="Success" kind="success"/>
			<Pea_button label="Danger" kind="danger"/>
			<Pea_button label="Warning" kind="warning"/>
		</Pea_section>
		<Pea_section title='Normal Variable Section Test' >
			<Pea_button label="Default"/>
			<Pea_button label="Primary" kind="primary"/>
			<Pea_button label="Success" kind="success"/>
			<Pea_button label="Danger" kind="danger"/>
			<Pea_button label="Warning" kind="warning"/>
		</Pea_section>
		<Pea_section vars='neon' title='Neon Variable Section Test' >
			<Pea_button label="Default"/>
			<Pea_button label="Primary" kind="primary"/>
			<Pea_button label="Success" kind="success"/>
			<Pea_button label="Danger" kind="danger"/>
			<Pea_button label="Warning" kind="warning"/>
		</Pea_section>
	</div>
	, document.getElementById('mainContainer')
);

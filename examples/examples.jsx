import React from 'react';
require('react-fastclick'); //no worky with radium

import _ from 'lodash';

import Pea_core from 'components/core';

//Peapod components
import Pea_timestamp from 'components/timestamp';
import Pea_button from 'components/button';
import Pea_image from 'components/image';
import Pea_input from 'components/forms/input';
import Pea_checkbox from 'components/forms/checkbox';


var sections = [];

//section: Buttons
sections.push(
	<div className="section" key={'buttons'}>
		<h1>Buttons</h1>
		
		<Pea_button label="Default"/>
		<Pea_button label="Primary" kind="primary" />
		<Pea_button label="Success" kind="success" />
		<Pea_button label="Danger" kind="danger" />
		<Pea_button label="Warning" kind="warning" />
		<br /><br />
		<Pea_button onClick={function(){alert('test')}} label="onClick handler" />
		<Pea_button href="http://peapod.io" label="Anchor/Link" kind="primary" />
		<Pea_button style={{color:'white', backgroundColor: 'purple', borderRadius: '2px 20px 2px 20px', fontWeight: 'bold', ':hover':{borderRadius: '20px 2px 20px 2px'}}} label="Custom" kind="default" />
		<Pea_button label="Raised" kind="primary" raised={true} />
		<Pea_button label="Round" kind="primary" round={true} />
		<Pea_button label="Disabled" kind="primary" disabled={true} />
		<Pea_button kind="success" round={true} raised={true} />
		<br /><br />
		<Pea_button label="Default - Pastel Variables" vars='pastel'/>
		<Pea_button label="Primary - Pastel Variables" kind="primary" vars='pastel'/>
		<Pea_button label="Success - Pastel Variables" kind="success" vars='pastel'/>
		<Pea_button label="Danger - Pastel Variables" kind="danger" vars='pastel'/>
		<Pea_button label="Warning - Pastel Variables" kind="warning" vars='pastel'/>

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

//Section: Microcomponents
sections.push(
	<div className="section" key={'microcomponents'}>
		<h1>Microcomponents</h1>
		
		<h2>Timestamps</h2>
		Page loaded <Pea_timestamp time={new Date().toISOString()} /><br />
		2005 was <Pea_timestamp time={new Date("Thu, 05 Apr 2005 05:05:05 GMT")} />
		
		<h2>Image</h2>
		<Pea_image src="image.jpg" alt="Default suffix" caption="This is caption" />
		&nbsp;
		<Pea_image src="image.jpg" hidpi-suffix="-mySuffix" alt="Custom suffix" />
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
React.render(
	<div>
		{sections}
		<div style={{textAlign:'center'}}><br />{ButtonTest}</div>
	</div>
	, document.getElementById('mainContainer')
);

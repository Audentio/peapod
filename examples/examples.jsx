import React from 'react'
import ReactDOM from 'react-dom'

import _ from 'lodash'

//Peapod
import 'peapod/vars'
import 'peapod/styler'
import 'peapod/components'

import {Pod_animation} from 'peapod/components/animation'

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

		<Pod.button label="Default" />
		<Pod.button label="Primary" styler={{kind:'primary'}} />
		<Pod.button label="Success" styler={{kind:'success'}} />
		<Pod.button label="Danger" styler={{kind:'danger'}} />
		<Pod.button label="Warning" styler={{kind:'warning'}} />

		<br /><br />
		<Pod.button onClick={function(){alert('test')}} label="onClick handler" />
		<Pod.button href="http://peapod.io" label="Anchor/Link" kind="primary" />
		<Pod.button styler={{kind: "default", style: {color:'white', backgroundColor: 'purple', borderRadius: '2px 20px 2px 20px', fontWeight: 'bold', ':hover':{borderRadius: '20px 2px 20px 2px'}}}} label="Custom" />
		<Pod.button label="Raised" styler={{kind: "primary", raised: true}} />
		<Pod.button label="Round" styler={{kind: "primary", round: true}} />
		<Pod.button label="Disabled" styler={{kind:"primary", disabled: true}} />
		<Pod.button styler={{kind: "success", round:true, raised: true}} />

	</div>
)

//Section: Forms
sections.push(
	<div className="section" key={'forms'}>
		<h1>Forms</h1>

		<h2>Text input</h2>
		<Pod.input placeholder="Placeholder..." styler={{placeholderStyle: {color: 'red'}}}/>
		<Pod.checkbox kind="primary" checked={true} />
	</div>
)

//Section: Icons
sections.push(
	<div className="section" key={'icons'}>
		<h1>Icons</h1>

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

/* Alerts
sections.push(
	<div className="section" key={'Animation'}>
		<h1>Animation</h1>
		<p>Animated components composed with Pod.animation HOC</p>
		<p><code>animation</code> prop [rotate, rotate_acw, pulse]</p>
		<br />

		<span style={{fontSize: '24px'}}>
			<Pod.icon animation="rotate">autorenew</Pod.icon>&nbsp;
			<Pod.icon animation="rotate,.4s">autorenew</Pod.icon>&nbsp;
			<Pod.icon animation="pulse">grade</Pod.icon><br />
			<Pod.icon animation="pulse,1s" color="red" style={{fontSize: '48px'}}>warning</Pod.icon>&nbsp;
			<Pod.icon animation="pulse,.4s" color="red" style={{fontSize: '48px'}}>play_circle_filled</Pod.icon>
		</span>

		<p>
			<Pod.icon animation="rotate,5s" style={{color: '#3947FF', marginRight: '-9px', animationDelay: '.3s', position: 'relative', top: '-6px', fontSize: '40px'}}>settings</Pod.icon>
			<Pod.icon animation="rotate_acw,5s" style={{fontSize: '48px', color: '#EA4343'}}>settings</Pod.icon>
		</p>
	</div>
)
*/


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
		<h1>Alerts</h1>
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
		<h1>Notifications</h1>

		<p><Pod.button onClick={restoreNotifs} label="Restore all notifications" /></p>

		<Pod.notification>Hello there!</Pod.notification>
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
			Twelve ziggurats quickly jumped a finch box Twelve ziggurats quickly jumped a finch box Twelve ziggurats quickly jumped a finch box
		</Pod.notification>
	</div>
)

var imageStyle = {width:'200px',height:'200px'};
//Section: Microcomponents
sections.push(
	<div className="section" key={'microcomponents'}>
		<h1>Microcomponents</h1>

		<h2>Timestamps</h2>
		Page loaded <Pod.timestamp time={new Date().toISOString()} /> (updates automatically)<br />
		2005 was <Pod.timestamp time={new Date("Thu, 05 Apr 2005 05:05:05 GMT")} />

		<h2>Image</h2>
		<p>(lazy load example below button test)</p>
		<Pod.image src="image.jpg" styler={{style:imageStyle}} lightboxAnimation={false} caption="lightbox without animation" />
		&nbsp;
		<Pod.image src="image.jpg" styler={{style:imageStyle}} lightbox={false} caption="lightbox disabled" hidpiData={[ ['1.5','-mySuffix'] ]} />
		&nbsp;
		<Pod.image src="image.jpg" styler={{style:imageStyle}} hidpiData={[ ['1.5','@2x'], ['2','@3x'] ]} alt="Custom suffix" caption="Loads image@3x.jpg for pixeDensity 2 or higher" />
		&nbsp;
		<Pod.image src="image.jpg" styler={{style:imageStyle}} alt="Default suffix" hidpiData={false} caption="who needs HiDPI anyway?" />
	</div>
)

sections.push(
	<div key="labels">
		<h1>Label</h1>
		<Pod.label icon="settings" styler={{
				kind: 'success',
				disabled: true,
				round: true
			}}>Test Label</Pod.label>
	</div>
)

sections.push(
	<Pod.section key="typography">
		<h1>Typography</h1>
		<h4>Paragraph</h4>
		<Pod.p>
			This is a paragraph. This is a paragraph. This is a paragraph.
			This is a paragraph. This is a paragraph. This is a paragraph.
			This is a paragraph. This is a paragraph. This is a paragraph.
			This is a paragraph. This is a paragraph. This is a paragraph.
			This is a paragraph. This is a paragraph. This is a paragraph.
			This is a paragraph. This is a paragraph.
		</Pod.p>

		<h4>Horizontal Rule </h4>
		<Pod.hr height="1" />
	</Pod.section>
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
	display: 'block',

	':hover' : { backgroundColor: 'red' }
};
for(var x=0; x<repeatCount; x++){
	ButtonTest.push( <Pod.button style={customStyleTest} kind="primary" key={x} /> );
}



/* This is where everything comes together */

var ExampleContent = React.createClass({

	render: function() {
		window._peapodRoot = this;

		return (
			<div>
				{sections}

				<div style={{textAlign:'center'}}><br />{ButtonTest}</div>
				<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
				<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
				<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
				<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
				<Pod.image src="http://h.fastcompany.net/multisite_files/fastcompany/poster/2015/06/3047491-poster-p-1-go-behind-the-scenes-of-mr-robot-usa-networks-timely-new-hacker-drama.jpg" lazy={true} caption="Lazy load!" hidpiData={false} />
			</div>
		)
	}
})

var examples_render = ReactDOM.render(
	<div>
		<ExampleContent />
	</div>
	, document.getElementById('mainContainer')
);

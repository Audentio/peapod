import React from 'react'

var sections = []

//Section: Buttons
sections.push(
	<div className="section" key={'buttons'}>
		<h1>Buttons</h1>

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
		<Pod.button onClick={function(){alert('test')}} label="onClick handler" />
		<Pod.button styler={{kind: "default", style: {color:'white', backgroundColor: 'purple', borderRadius: '2px 20px 2px 20px', fontWeight: 'bold', ':hover':{borderRadius: '20px 2px 20px 2px'}}}} label="Custom" />
		<Pod.button href="http://peapod.io" label="Anchor/Link" kind="primary" />
	</div>
)


var rand = function(factor = 100){
	return Math.floor(Math.random()*factor)
}
var ProgressElement = Pod.progress;
var ProgressExamples = React.createClass({
	types: ['base','primary','info','success','danger','warning','secondary'],
	getRandom: function(){
		var bars = [];
		this.types.forEach(function(type){
			bars.push(<ProgressElement key={type} value={rand()} styler={{kind:type}} />)
		})
		this.setState({items: bars})
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
	getInitialState: function(){ return {items: []}},
	render: function(){
		return (
			<div key="something" onClick={this.getRandom}>
				<p style={{marginBottom: '8px'}}><strong>Examples: </strong>Click on these to randomize [or <a href="#" onClick={this.goNuts}>Go nuts</a>]</p>
				{this.state.items}
			</div>
		);
	}
})

var Progressing = React.createClass({
	getInitialState: function(){
		return {
			value: 0,
			btnText: 'pause'
		}
	},
    loop: false,
	startLoop: function(){
		var _this = this;
		this.loop = setInterval(function(){
			var currentValue = _this.state.value;
			_this.setState({
				value: currentValue + Math.floor(Math.random()*10)
			})
			if(_this.state.value >= 100) {
				//clearInterval(progressing) //Where's the fun in that?
				_this.setState({
					value: 0 //GO AGAIN
				})
			}
		}, 500);
	},
	toggleLoop: function(e){
		e.preventDefault();
		if(this.loop) {
			clearInterval(this.loop)
			this.loop = false
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
		this.loop = false
    },
	render: function(){
		return (
			<div>
				<p style={{marginBottom: '8px'}}>Natural progression example [<a href="#" onClick={this.toggleLoop}>{this.state.btnText}</a>]</p>
				<Pod.progress value={this.state.value} />
			</div>
		);
	}
});

sections.push(
	<div className="section" key="Progress">
		<h1>Progress</h1>

		<div style={{maxWidth: '500px'}}>
			<ProgressExamples />
		</div>
        <br />
		<p style={{marginBottom: '8px'}}>Different strokes (stroke prop)</p>
		<Pod.progress styler={{kind:'info'}} stroke={2} value={rand()} />
		<Pod.progress styler={{kind:'info'}} stroke={8} value={rand()} />
		<Pod.progress styler={{kind:'info'}} stroke={12} value={rand()} />

		<br /> <Progressing /> <br />

		<p style={{marginBottom: '8px'}}>Indeterminate (No props passed. value defaults to -1 which renders indeterminate progress)</p>
		<Pod.progress />
	</div>
)

var imageStyle = {width:'200px',height:'200px'};
sections.push(
	<div className="section" key="Photo">
		<h1>Photo</h1>
		<Pod.photo src="image.png" styler={{style:imageStyle}} lightboxAnimation={false} caption="lightbox without animation" />
		&nbsp;
		<Pod.photo src="image.png" styler={{style:imageStyle}} lightbox={false} caption="lightbox disabled" hidpiData={[ ['1.5','-mySuffix'] ]} />
		&nbsp;
		<Pod.photo src="image.png" styler={{style:imageStyle}} hidpiData={[ ['1.5','@2x'], ['2','@3x'] ]} caption="pixelDensity > 2 : @3x" />
		&nbsp;
		<Pod.photo src="image.png" styler={{style:imageStyle}} alt="Default suffix" hidpiData={false} caption="HiDPI disabled" />
	</div>
);

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
			Twelve ziggurats quickly jumped a finch box Twelve ziggurats quickly jumped a finch box Twelve ziggurats quickly jumped a finch box
		</Pod.notification>
	</div>
)

//Section: Microcomponents
sections.push(
	<div className="section" key={'microcomponents'}>
		<h1>Microcomponents</h1>

		<h2>Timestamps</h2>
		Page loaded <Pod.timestamp time={new Date().toISOString()} /> (updates automatically)<br />
		2005 was <Pod.timestamp time={new Date("Thu, 05 Apr 2005 05:05:05 GMT")} />
	</div>
)

sections.push(
	<div className="section" key="labels">
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

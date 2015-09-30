React.render(
	<div>
	
	<div className="section">
	
		<h1>Buttons</h1>
		<Pea_button label="Default" />
		<Pea_button label="Primary" kind="primary" />
		<Pea_button label="Success" kind="success" />
		<Pea_button label="Danger" kind="danger" />
		<Pea_button label="Warning" kind="warning" />
		<br /><br />
		<Pea_button href="http://peapod.io" label="Anchor/Link" kind="primary" />
		<Pea_button style={{color:'white', backgroundColor: 'purple', textTransform: 'uppercase', fontWeight: 'bold'}} label="Custom" kind="default" />
		<Pea_button label="Raised" kind="primary" raised={true} />
		<Pea_button label="Round" kind="primary" round={true} />
		<Pea_button label="Disabled" kind="primary" disabled={true} />
		
	</div>
	
	<div className="section">
	
		<h1>Forms</h1>
		
		<h2>Text input</h2>
		<Pea_textInput placeholder="Placeholder text..." />
		<Pea_textInput style={{color:'blue'}} placeholder="Inherits color" />
		<Pea_textInput value="Initial value" placeholder="Derp" />
		<Pea_textInput style={{borderColor:'red'}} value="Custom border-color" />
		
		<h2>Checkbox</h2>
		<Pea_checkbox label="Check this for glory" />
		<br /><br />
		<Pea_checkbox label="Checked by default." checked={true} />
		<br /><br />
		<strong>rainbow</strong>
		<br /><br />
		<Pea_checkbox kind="primary" checked={true} />
		<Pea_checkbox kind="success" checked={true} /> 
		<Pea_checkbox kind="danger" checked={true} /> 
		<Pea_checkbox kind="warning" checked={true} />
	
	</div>
	
	<div className="section">
		<h1>Microcomponents</h1>
		
		<h2>Timestamps</h2>
		<strong>Live timestamp:</strong> <Pea_liveTimestamp time="Wed, 29 Sep 2015 12:12:32 GMT" />
	</div>
	
	</div>
	, document.getElementById('mainContainer')
);
import React from 'react'
import ReactDOM from 'react-dom'

import _ from 'lodash'

//Peapod
import 'peapod/vars'
import 'peapod/styler'
import 'peapod/components'



var SelectorDoc = React.createClass({
	doc: function(selector, i) {
		var when = (selector.when == null) ? null : <span>When "{selector.when.toString()}": </span>

		return (
			<li style={{margin: '10px 0'}} key={i}>
				<pre style={{backgroundColor: '#F6F6F6', padding: '10px', fontFamily: '"Lucida Console", Monaco, monospace'}}>
					{when}{JSON.stringify(selector.scenes, null, 4)}
				</pre>
			</li>
		)
	},

	render: function() {
		return (
			this.doc(this.props.selector, this.props.i)
		)
	}
});

var PartDoc = React.createClass({
	doc: function(part) {
		var selectorResult = [];

		for (var i = 0, len = part.selectors.length; i < len; i++) {
			selectorResult.push(<SelectorDoc key={i} selector={part.selectors[i]} i={i} />);
		}

		return (
			<Pod.div key={part.name} styler={{style: {padding: '{$gutter.internal} 0', borderBottom: '1px solid {$color.base.alert}'}}}>
				<h4>Part: {part.name}</h4>
				<ul>
					{selectorResult}
				</ul>
			</Pod.div>
		);
	},

	render: function() {
		return (
			this.doc(this.props.part)
		)
	}
})


var ConditionDoc = React.createClass({
	subDoc: function(input, name) {
		if (input == null) return null;
		var keys = Object.keys(input),
			result = [];
		for (var i = 0, len = keys.length; i < len; i ++) {
			var key = keys[i],
				keyVal = input[key];

			if (keyVal == true) {
				keyVal = "true";
			} else if (keyVal == false) {
				keyVal = "false"
			} else if (typeof(keyVal) == 'object') {
				keyVal = keyVal[0] + ' "' + keyVal[1] + '"'
			} else {
				keyVal = '"' + keyVal + '"';
			}

			result.push(
				<div key={i} style={{paddingLeft: '20px'}}>
					{key} : {keyVal}
				</div>
			)
		}
		return (
			<div key={name}>
				<h5>{name}:</h5>
				{result}
			</div>
		)
	},

	doc: function(condition, sheetName, name) {
		var styler = this.subDoc(condition.styler, "Styler"),
			state = this.subDoc(condition.state, "State"),
			props = this.subDoc(condition.props, "Props"),
			context = this.subDoc(condition.context, "Context"),
			Component = Pod[sheetName.charAt(0).toLowerCase() + sheetName.slice(1)],
			showComponents = "Alert,Button,Checkbox,Div,Hr,Input,Label,Paragraph";

		if (showComponents.indexOf(sheetName) > -1) {
			return (
				<Pod.div key={name} styler={{style: {padding: '{$gutter.internal} 0', borderBottom: '1px solid {$color.base.alert}'}}}>
					{name}: <Component styler={condition.styler}>Test {sheetName}</Component>
					<pre style={{backgroundColor: '#F6F6F6', padding: '10px', fontFamily: '"Lucida Console", Monaco, monospace'}}>
						{styler}
						{state}
						{props}
						{context}
					</pre>
				</Pod.div>
			)
		} else {
			return (
				<div key={name} styler={{style: {padding: '{$gutter.internal} 0', borderBottom: '1px solid {$color.base.alert}'}}}>
					{name}: (Could not Render)
					{styler}
					{state}
					{props}
					{context}
				</div>
			)
		}
	},

	render: function() {
		return (
			this.doc(this.props.condition, this.props.sheetName, this.props.conditionName)
		)
	}
})

var ComponentDoc = React.createClass({
	doc(sheetName, component) {
		var partsResult = [],
			parts = component.getParts(),
			partNames = Object.keys(parts),
			conditionResults = [],
			conditions = component.getConditions(),
			conditionNames = Object.keys(conditions),
			variables = JSON.stringify(component.getValues(), null, 4);

		for (var i = 0, len = conditionNames.length; i < len; i++) {
			conditionResults.push(<ConditionDoc key={i} condition={conditions[conditionNames[i]]} sheetName={sheetName} conditionName={conditionNames[i]} />);
		}

		for (var i = 0, len = partNames.length; i < len; i++) {
			partsResult.push(<PartDoc key={i} part={parts[partNames[i]]} />);
		}

		var tabs = [
			{
				trigger: "Variables",
				content: <pre style={{backgroundColor: '#F6F6F6', padding: '10px', fontFamily: '"Lucida Console", Monaco, monospace'}}>{variables}</pre>,
			},
			{
				trigger: "Conditions",
				content: conditionResults
			},
			{
				trigger: "Parts",
				content: partsResult
			}
		]

		return (
			<div key={sheetName} style={{paddingLeft: '20px', margin: '40px 0'}}>
				<h1 style={{marginBottom: '10px'}}>Component: {sheetName}</h1>


				<div>
					<Pod.tabs tabs={tabs} activeTab={1}></Pod.tabs>
				</div>
			</div>
		)
	},

	render: function() {
		return (
			this.doc(this.props.componentName, this.props.component)
		)
	}

})


var LibrariesDoc = React.createClass({
	doc: function() {
		var libraries = Pod_Styler.getLibraryStack(),
			libraryResult = [];
		for (var i = 0, len = libraries.length; i < len; i++) {
			var library = libraries[i];
			if (library.type !== 'local') {
				var components = library.components,
					componentNames = library.componentNames,
					componentResults = [];

				for (var componentIndex = 0, componentLen = componentNames.length; componentIndex < componentLen; componentIndex++) {
					var componentName = componentNames[componentIndex],
						component = components[componentName];
					componentResults.push(
						<ComponentDoc key={componentIndex} componentName={componentName} component={component}/>

					);
				}
				libraryResult.push(
					<div key={i}>
						<h2>Library: {library.name}</h2>
						{componentResults}
					</div>
				);
			}

		}
		return (
			<div>
				<h1>Peapod Self-Documentation (Work in Progress)</h1>
				{libraryResult}
			</div>
		)
	},

	render: function() {
		return (
			this.doc()
		)
	}
})



var doc_render = ReactDOM.render(
	<div>
		<LibrariesDoc />
	</div>
	, document.getElementById('mainContainer')
);

import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'

import _ from 'lodash'

//Peapod
import 'peapod/vars'
import 'peapod/styler'
import 'peapod/components'

var Color = require("color")
var Remarkable = require('remarkable');
var md = new Remarkable('full', {
  html:         false,        // Enable HTML tags in source
  xhtmlOut:     false,        // Use '/' to close single tags (<br />)
  breaks:       false,        // Convert '\n' in paragraphs into <br>
  langPrefix:   'language-',  // CSS language prefix for fenced blocks
  linkify:      true,         // autoconvert URL-like texts to links
  linkTarget:   '',           // set target to open link in

  // Enable some language-neutral replacements + quotes beautification
  typographer:  false,

  // Double + single quotes replacement pairs, when typographer enabled,
  // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
  quotes: '“”‘’',

  // Highlighter function. Should return escaped HTML,
  // or '' if input not changed
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (__) {}

    return ''; // use external default escaping
  }
});




var jsonDoc = function(obj, scene, key, depth = 0) {
	var styleKeys = Object.keys(obj),
		styles = [],
		header = (depth == 0) ? <Pod.div styler={{style:{display: 'inline'}}}><Pod.div styler={{style:{color: '$palette.red300', display: 'inline'}}}>{key}</Pod.div>:</Pod.div> : null;

	for (var i = 0, len = styleKeys.length; i < len; i++) {
		var styleKey = styleKeys[i],
			rawStyle = obj[styleKey],
			style = rawStyle,
			parsedStyle = "",
			parsedVariable = "",
			colorValue = "",
			colorBlock = null,
			keyColor = (depth % 2 == 0) ? '$palette.blue300': '$palette.cyan300';

		if (typeof(rawStyle) == 'object') {
			style = jsonDoc(rawStyle, scene, styleKey, depth + 1);
		}

		if (typeof(rawStyle) == 'string' && rawStyle.length > 1) {
			parsedVariable = Pod_Styler.parseVariableValue(rawStyle, {styler: {}, state: {}, props: {}, context: {}}, key);
			if (parsedVariable !== rawStyle) {
				if (typeof(parsedVariable) == 'object') {
					throw "Variable of type object.";
				}
				parsedStyle = <span> <span>({parsedVariable})</span></span>
			}
		}

		if (parsedVariable !== '') {
			colorValue = parsedVariable;
		} else if (typeof(rawStyle) == 'string') {
			colorValue = rawStyle;
		}


		try {
			var color = Color(colorValue)
			if (parseInt(colorValue) != colorValue) {
				colorBlock = <span> <span style={{verticalAlign: 'middle', border: 'solid 1px black', backgroundColor: colorValue, width: '14px', height: '14px', display: 'inline-block'}}> </span></span>
			}
		} catch(err) {
			// couldn't make valid color, but don't really care for this, just don't output anything
		}

		styles.push(
			<Pod.div key={i} styler={{style: {paddingLeft: '20px'}}}>
				<Pod.div styler={{style:{color: keyColor, display: 'inline'}}}>{styleKey}</Pod.div>: {style},{parsedStyle}{colorBlock}
			</Pod.div>
		)
	}

	return (
		<Pod.div key={key}>
			{header}
			{styles}
		</Pod.div>
	);
}

var renderComponent = function(sheetName, condition, stylesheet) {
	var Component = Pod[sheetName.charAt(0).toLowerCase() + sheetName.slice(1)],
		showComponents = "Alert,Button,Checkbox,CircularProgress,Hr,Input,Label,Paragraph,Progress",
		docDefault = stylesheet.getDocDefault(),
		defaults = {},
		defaultChildren = "Test " + sheetName;

	if (docDefault !== null) {
		defaults = docDefault;
		if (typeof(docDefault.children) !== 'undefined') {
			defaultChildren = docDefault.children;
		}
	}

	if (showComponents.indexOf(sheetName) > -1) {
		return 	<Component styler={condition.styler} {...defaults}>{defaultChildren}</Component>
	} else {
		return <span>(Could not render)</span>
	}

}

var SelectorDoc = React.createClass({
	doc: function(selector, i) {
		var when = (selector.when == null) ? null : <span>When: <Pod.div styler={{style:{color: '$palette.purple300', display: 'inline'}}}>"{selector.when.toString()}"</Pod.div> </span>,
			scenes = [],
			sceneKeys = Object.keys(selector.scenes);

		for (var i = 0, len = sceneKeys.length; i < len; i++) {

			var key = sceneKeys[i],
				scene = selector.scenes[key].style;

			scenes.push(jsonDoc(scene, key, key, 0));
		}

		return (
			<li style={{margin: '10px 0'}} key={i}>
				<Pod.codeBlock>
					{when}
					{scenes}
				</Pod.codeBlock>
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
				<h2>Part: {part.name}</h2>
				<Pod.div styler={{style: {paddingLeft: '20px', borderLeft: '4px solid {$color.info.base}'}}}>
					<ul>
						{selectorResult}
					</ul>
				</Pod.div>
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
					<Pod.div styler={{style:{color: '$palette.blue300', display: 'inline'}}}>{key}</Pod.div>: {keyVal},
				</div>
			)
		}
		return (
			<div key={name}>
				<Pod.div styler={{style:{color: '$palette.red300', display: 'inline'}}}>{name}</Pod.div>:
				{result}
			</div>
		)
	},

	doc: function(condition, sheetName, name, stylesheet) {
		var styler = this.subDoc(condition.styler, "Styler"),
			state = this.subDoc(condition.state, "State"),
			props = this.subDoc(condition.props, "Props"),
			context = this.subDoc(condition.context, "Context"),
			renderedComponent = renderComponent(sheetName, condition, stylesheet);


		return (
			<Pod.div key={name} styler={{style: {padding: '{$gutter.internal} 0', borderBottom: '1px solid {$color.base.alert}'}}}>
				<h2>Condition: {name}</h2>
				<Pod.div styler={{style: {margin: '1rem 0', paddingLeft: '20px', borderLeft: '4px solid {$color.info.base}'}}}>
					{renderedComponent}
					<pre style={{backgroundColor: '#F6F6F6', padding: '10px', fontFamily: '"Lucida Console", Monaco, monospace'}}>
						{styler}
						{state}
						{props}
						{context}
					</pre>
				</Pod.div>
			</Pod.div>
		)
	},

	render: function() {
		return (
			this.doc(this.props.condition, this.props.sheetName, this.props.conditionName, this.props.stylesheet)
		)
	}
})

var ComponentDoc = React.createClass({
	getInitialState: function() {
		return {
			checked: {}
		}
	},

	doc(sheetName, component) {
		var partsResult = [],
			parts = component.getParts(),
			partNames = Object.keys(parts),
			conditionResults = [],
			conditions = component.getConditions(),
			conditionNames = Object.keys(conditions),
			variables = [],
			variableSource = component.getValues(),
			variableKeys = Object.keys(variableSource);

		for (var i = 0, len = variableKeys.length; i < len; i++) {
			var key = variableKeys[i],
				source = variableSource[key];

			variables.push(jsonDoc(source, key, key, 0));
		}

		for (var i = 0, len = conditionNames.length; i < len; i++) {
			conditionResults.push(<ConditionDoc key={i} stylesheet={component} condition={conditions[conditionNames[i]]} sheetName={sheetName} conditionName={conditionNames[i]} />);
		}

		for (var i = 0, len = partNames.length; i < len; i++) {
			partsResult.push(<PartDoc key={i} part={parts[partNames[i]]} />);
		}

		var sandboxDoc = [],
			sandboxCondition = {};

		for (var i = 0, len = conditionNames.length; i < len; i++) {
			var checkbox = function(index) {
				var edit = function(val) {
					if (typeof(val) !== 'undefined') {
						this.state.checked[index] = val;
						this.setState({
							checked: this.state.checked
						})
					}
				}

				return <Pod.checkbox checked={this.state.checked[index] == true} onChange={edit.bind(this)}></Pod.checkbox>;
			}.bind(this);

			var content = checkbox(i);

			sandboxDoc.push(<div key={i}><h2 style={{display: 'inline'}}>{conditionNames[i]}:</h2> {content}</div>)
		}

		for (var i = 0, len = conditionNames.length; i < len; i++) {
			if (this.state.checked[i] == true) {
				var condition = conditions[conditionNames[i]];

				if (condition.styler !== null) {
					sandboxCondition.styler = _.merge({}, sandboxCondition.styler, condition.styler);
				}
				if (condition.state !== null) {
					sandboxCondition.state = _.merge({}, sandboxCondition.state, condition.state);
				}
				if (condition.props !== null) {
					sandboxCondition.props = _.merge({}, sandboxCondition.props, condition.props);
				}
				if (condition.context !== null) {
					sandboxCondition.context = _.merge({}, sandboxCondition.context, condition.context);
				}
			}
		}

		var renderedComponent = renderComponent(sheetName, sandboxCondition, component)

		var jsxStyler = "",
			jsxComponentName = 'Pod.' + sheetName.charAt(0).toLowerCase() + sheetName.slice(1);


		if (typeof(sandboxCondition.styler) !== 'undefined') {
			jsxStyler = ' styler={' + JSON.stringify(sandboxCondition.styler) + '}'
		}

		var componentJSX = '<' + jsxComponentName + jsxStyler + '>' + '</' + jsxComponentName + '>';

		var sandboxResults = <div>
			{sandboxDoc}
			{renderedComponent}
			<Pod.codeBlock>{componentJSX}</Pod.codeBlock>
		</div>

		var tabs = [
			{
				trigger: "Variables",
				content: <pre style={{backgroundColor: '#F6F6F6', padding: '10px', fontFamily: '"Lucida Console", Monaco, monospace'}}>{variables}</pre>,
			}, {
				trigger: "Conditions",
				content: conditionResults
			}, {
				trigger: "Parts",
				content: partsResult
			}, {
				trigger: 'Sandbox',
				content: sandboxResults
			}
		]

		if (component.getDoc().length) {
			tabs.push({
				trigger: "General",
				content: <div dangerouslySetInnerHTML={{__html: md.render(component.getDoc())}} />
			})
		}

		return (
			<div key={sheetName} style={{paddingLeft: '20px', margin: '40px 0'}}>
				<h1 style={{marginBottom: '10px'}}>Component: {sheetName}</h1>
				<div>
					<Pod.tabs tabs={tabs} activeTab={0}></Pod.tabs>
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
		window._peapodRoot = this;

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
						<h1>Library: {library.name}</h1>
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

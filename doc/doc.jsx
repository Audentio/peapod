import React from 'react';
import ReactDOM from 'react-dom';

import _ from 'lodash';

// Peapod
import Styler from 'utility/styler.js';
import Pod from 'utility/components.js';

import Color from 'color';
import Remarkable from 'remarkable';

const md = new Remarkable('full', {
    html: false,        // Enable HTML tags in source
    xhtmlOut: false,        // Use '/' to close single tags (<br />)
    breaks: false,        // Convert '\n' in paragraphs into <br>
    langPrefix: 'language-',  // CSS language prefix for fenced blocks
    linkify: true,         // autoconvert URL-like texts to links
    linkTarget: '',           // set target to open link in

    // Enable some language-neutral replacements + quotes beautification
    typographer: false,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
    quotes: '“”‘’',
});

const jsonDoc = function (obj, scene, key, depth = 0) {
    const styleKeys = Object.keys(obj);
    const styles = [];
    const header = (depth === 0) ?
        <Pod.Div styler={{ style: { display: 'inline' } }}>
            <Pod.Div styler={{ style: { color: '$palette.red300', display: 'inline' } }}>
                {key}
            </Pod.Div>:
        </Pod.Div>
        : null;

    for (let i = 0, len = styleKeys.length; i < len; i++) {
        const styleKey = styleKeys[i];
        const rawStyle = obj[styleKey];
        let style = rawStyle;
        let parsedStyle = '';
        let parsedVariable = '';
        let colorValue = '';
        let colorBlock = null;
        const keyColor = (depth % 2 === 0) ? '$palette.blue300' : '$palette.cyan300';

        if (typeof(rawStyle) === 'object') {
            style = jsonDoc(rawStyle, scene, styleKey, depth + 1);
        }

        if (typeof(rawStyle) === 'string' && rawStyle.length > 1) {
            parsedVariable = Styler.parseVariableValue(rawStyle, { styler: {}, state: {}, props: {}, context: {} }, key);
            if (parsedVariable !== rawStyle) {
                if (typeof(parsedVariable) === 'object') {
                    throw new Error('Variable of type object.');
                }
                parsedStyle = <span> <span>({parsedVariable})</span></span>;
            }
        }

        if (parsedVariable !== '') {
            colorValue = parsedVariable;
        } else if (typeof(rawStyle) === 'string') {
            colorValue = rawStyle;
        }

        try {
            const color = Color(colorValue); // eslint-disable-line
            if (parseInt(colorValue, 10) !== colorValue) {
                colorBlock = <span><span style={{ verticalAlign: 'middle', border: 'solid 1px black', backgroundColor: colorValue, width: '14px', height: '14px', display: 'inline-block' }}> </span></span>;
            }
        } catch (err) {
            // couldn't make valid color, but don't really care for this, just don't output anything
        }

        styles.push(
            <Pod.Div key={i} styler={{ style: { paddingLeft: '20px' } }}>
                <Pod.Div styler={{ style: { color: keyColor, display: 'inline' } }}>
                    {styleKey}
                </Pod.Div> : {style},{parsedStyle}{colorBlock}
            </Pod.Div>
        );
    }

    return (
        <Pod.Div key={key}>
            {header}
            {styles}
        </Pod.Div>
    );
};

const renderComponent = function (sheetName, condition, stylesheet) {
    const Component = Pod[sheetName];
    const showComponents = 'Alert,Button,Checkbox,CircularProgress,Hr,Input,Label,Paragraph,Progress';
    const docDefault = stylesheet.getDocDefault();
    let defaults = {};
    let defaultChildren = `Test ${sheetName}`;

    if (docDefault !== null) {
        defaults = docDefault;
        if (typeof(docDefault.children) !== 'undefined') {
            defaultChildren = docDefault.children;
        }
    }

    if (showComponents.indexOf(sheetName) > -1) {
        return 	<Component styler={condition.styler} {...defaults}>{defaultChildren}</Component>;
    }
    return <span>(Not in `showComponents` in `doc.jsx`)</span>;
};

class SelectorDoc extends React.Component {
    static propTypes = {
        selector: React.PropTypes.any,
        i: React.PropTypes.number,
    }

    doc(selector, i) {
        const when = (selector.when == null) ?
            null :
            <span>When: <Pod.Div styler={{ style: { color: '$palette.purple300', display: 'inline' } }}>"{selector.when.toString()}"</Pod.Div> </span>;
        const scenes = [];
        const sceneKeys = Object.keys(selector.scenes);

        for (let sceneIndex = 0, len = sceneKeys.length; sceneIndex < len; sceneIndex++) {
            const key = sceneKeys[sceneIndex];
            const scene = selector.scenes[key].style;

            scenes.push(jsonDoc(scene, key, key, 0));
        }

        return (
            <li style={{ margin: '10px 0' }} key={i}>
                <Pod.CodeBlock highlight={false}>
                    {when}
                    {scenes}
                </Pod.CodeBlock>
            </li>
        );
    }

    render() {
        return (
            this.doc(this.props.selector, this.props.i)
        );
    }
}

class PartDoc extends React.Component {
    static propTypes = {
        part: React.PropTypes.any,
    }

    doc(part) {
        const selectorResult = [];

        for (let i = 0, len = part.selectors.length; i < len; i++) {
            selectorResult.push(<SelectorDoc key={i} selector={part.selectors[i]} i={i} />);
        }

        return (
            <Pod.Div key={part.name} styler={{ style: { padding: '{$gutter.internal} 0', borderBottom: '1px solid {$color.base.alert}' } }}>
                <h2>Part: {part.name}</h2>
                <Pod.Div styler={{ style: { paddingLeft: '20px', borderLeft: '4px solid {$color.info.base}' } }}>
                    <ul>
                        {selectorResult}
                    </ul>
                </Pod.Div>
            </Pod.Div>
        );
    }

    render() {
        return (
            this.doc(this.props.part)
        );
    }
}

class ConditionDoc extends React.Component{
    static propTypes = {
        condition: React.PropTypes.any,
        sheetName: React.PropTypes.string,
        conditionName: React.PropTypes.string,
        stylesheet: React.PropTypes.any,
    }

    subDoc(input, name) {
        if (input === null || input === undefined) return null;
        const keys = Object.keys(input);
        const result = [];
        for (let i = 0, len = keys.length; i < len; i ++) {
            const key = keys[i];
            let keyVal = input[key];

            if (keyVal === true) {
                keyVal = 'true';
            } else if (keyVal === false) {
                keyVal = 'false';
            } else if (typeof(keyVal) === 'object') {
                keyVal = `${keyVal[0]} "${keyVal[1]}"`;
            } else {
                keyVal = `"${keyVal}"`;
            }

            result.push(
                <div key={i} style={{ paddingLeft: '20px' }}>
                    <Pod.Div styler={{ style: { color: '$palette.blue300', display: 'inline' } }}>{key}</Pod.Div>: {keyVal},
                </div>
            );
        }

        return (
            <div key={name}>
                <Pod.Div styler={{ style: { color: '$palette.red300', display: 'inline' } }}>{name}</Pod.Div>:
                {result}
            </div>
        );
    }

    doc(condition, sheetName, name, stylesheet) {
        const styler = this.subDoc(condition.styler, 'Styler');
        const state = this.subDoc(condition.state, 'State');
        const props = this.subDoc(condition.props, 'Props');
        const context = this.subDoc(condition.context, 'Context');
        const renderedComponent = renderComponent(sheetName, condition, stylesheet);


        return (
            <Pod.Div key={name} styler={{ style: { padding: '{$gutter.internal} 0', borderBottom: '1px solid {$color.base.alert}' } }}>
                <h2>Condition: {name}</h2>
                <Pod.Div styler={{ style: { margin: '1rem 0', paddingLeft: '20px', borderLeft: '4px solid {$color.info.base}' } }}>
                    {renderedComponent}
                    <Pod.CodeBlock highlight={false}>
                        {styler}
                        {state}
                        {props}
                        {context}
                    </Pod.CodeBlock>
                </Pod.Div>
            </Pod.Div>
        );
    }

    render() {
        return (
            this.doc(this.props.condition, this.props.sheetName, this.props.conditionName, this.props.stylesheet)
        );
    }
}

class ComponentDoc extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            checked: {},
        };
    }

    static propTypes = {
        componentName: React.PropTypes.string,
        component: React.PropTypes.any,
    }

    doc(sheetName, component) {
        const partsResult = [];
        const parts = component.getParts();
        const partNames = Object.keys(parts);
        const conditionResults = [];
        const conditions = component.getConditions();
        const conditionNames = Object.keys(conditions);
        const variables = [];
        const variableSource = component.getValues();
        const variableKeys = Object.keys(variableSource);

        for (let i = 0, len = variableKeys.length; i < len; i++) {
            const key = variableKeys[i];
            const source = variableSource[key];

            variables.push(jsonDoc(source, key, key, 0));
        }

        for (let i = 0, len = conditionNames.length; i < len; i++) {
            conditionResults.push(<ConditionDoc key={i} stylesheet={component} condition={conditions[conditionNames[i]]} sheetName={sheetName} conditionName={conditionNames[i]} />);
        }

        for (let i = 0, len = partNames.length; i < len; i++) {
            partsResult.push(<PartDoc key={i} part={parts[partNames[i]]} />);
        }

        const sandboxDoc = [];
        const sandboxCondition = {};

        for (let i = 0, len = conditionNames.length; i < len; i++) {
            const checkbox = function (index) {
                const edit = function (val) {
                    if (typeof(val) !== 'undefined') {
                        this.state.checked[index] = val;
                        this.setState({
                            checked: this.state.checked,
                        });
                    }
                }.bind(this);

                return <Pod.Checkbox checked={this.state.checked[index] === true} onChange={edit}></Pod.Checkbox>;
            }.bind(this);

            const content = checkbox(i);

            sandboxDoc.push(<div key={i}><h2 style={{ display: 'inline' }}>{conditionNames[i]}:</h2> {content}</div>);
        }

        for (let i = 0, len = conditionNames.length; i < len; i++) {
            if (this.state.checked[i] === true) {
                const condition = conditions[conditionNames[i]];

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

        const renderedComponent = renderComponent(sheetName, sandboxCondition, component);

        let jsxStyler = '';
        const jsxComponentName = `Pod.${sheetName}`;

        if (typeof(sandboxCondition.styler) !== 'undefined') {
            jsxStyler = ` styler={ ${JSON.stringify(sandboxCondition.styler)} }`;
        }

        const componentJSX = `<${jsxComponentName}${jsxStyler}></${jsxComponentName}>`;

        const sandboxResults = (<div>
            {sandboxDoc}
            {renderedComponent}
            <Pod.CodeBlock highlight={false}>{componentJSX}</Pod.CodeBlock>
        </div>);

        const tabs = [
            {
                trigger: 'Variables',
                content: <Pod.CodeBlock highlight={false}>{variables}</Pod.CodeBlock>,
            }, {
                trigger: 'Conditions',
                content: conditionResults,
            }, {
                trigger: 'Parts',
                content: partsResult,
            }, {
                trigger: 'Sandbox',
                content: sandboxResults,
            },
        ];

        if (typeof(Pod.Examples[jsxComponentName.replace('Pod.', '')]) !== 'undefined') {
            const ExampleComponent = Pod.Examples[jsxComponentName.replace('Pod.', '')];
            const exampleResults = <div><ExampleComponent /></div>;

            tabs.push({
                trigger: 'Example',
                content: exampleResults,
            });
        }

        if (component.getDoc().length) {
            tabs.push({
                trigger: 'General',
                content: <div dangerouslySetInnerHTML={{ __html: md.render(component.getDoc()) }} />,
            });
        }

        return (
            <div key={sheetName} style={{ paddingLeft: '20px', margin: '40px 0' }}>
                <h1 style={{ marginBottom: '10px' }}>Component: {sheetName}</h1>
                <div>
                    <Pod.Tabs tabs={tabs} activeTab={0}></Pod.Tabs>
                </div>
            </div>
        );
    }

    render() {
        return (
            this.doc(this.props.componentName, this.props.component)
        );
    }

}


class LibrariesDoc extends React.Component {
    doc() {
        const libraries = Styler.getLibraryStack();
        const libraryResult = [];
        for (let i = 0, len = libraries.length; i < len; i++) {
            const library = libraries[i];
            if (library.type !== 'local') {
                const components = library.components;
                const componentNames = Object.keys(components);
                const componentResults = [];

                for (let componentIndex = 0, componentLen = componentNames.length; componentIndex < componentLen; componentIndex++) {
                    const componentName = componentNames[componentIndex];
                    const component = components[componentName];
                    componentResults.push(
                        <ComponentDoc key={componentIndex} componentName={componentName} component={component} />
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
        );
    }

    render() {
        return (
            this.doc()
        );
    }
}

ReactDOM.render(
    <div>
        <LibrariesDoc />
    </div>
    , document.getElementById('mainContainer')
);

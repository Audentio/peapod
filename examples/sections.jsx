import React from 'react';
import { Pane, Examples } from 'components.js';
import SectionComponent from './sectionComponent.jsx';

const firstComponents = ['Hero', 'FixedElement', 'Parallax'];
const noName = ['Hero'];

const componentsOutput = [];
for (let i = 0, len = firstComponents.length; i < len; i++) {
    const key = firstComponents[i];
    if (typeof(Examples[key]) !== 'undefined') {
        const Example = Examples[key];
        componentsOutput.push(<SectionComponent noName={noName} name={key} key={`Section First ${i}`}><Example /></SectionComponent>);
    } else {
        console.warn(`Missing Example for First Component ${key}.`); // eslint-disable-line no-console
    }
}

const exampleComponents = Object.keys(Examples);
for (let i = 0, len = exampleComponents.length; i < len; i++) {
    const key = exampleComponents[i];
    if (firstComponents.indexOf(key) === -1) {
        componentsOutput.push(<SectionComponent noName={noName} name={key} key={`Section ${i}`} />);
    }
}

export default class Sections extends React.Component {
    render() {
        return (
            <div>
                <Pane>
                    {componentsOutput}
                </Pane>
            </div>
        );
    }
}

import React from 'react';
import { Pane, Section, Heading, ContentWrap, Examples } from 'components.js';

const firstComponents = ['Hero', 'FixedElement', 'Parallax'];
const noName = ['Hero'];

class SectionComponent extends React.Component {
    static propTypes = {
        children: React.PropTypes.any,
        name: React.PropTypes.string,
    };

    render() {
        if (noName.indexOf(this.props.name) > -1) {
            return (<div>{this.props.children}</div>);
        }
        
        return (
            <Section>
                <ContentWrap>
                    <Heading>{this.props.name}</Heading>
                </ContentWrap>
                {this.props.children}
            </Section>
        );
    }
}


const componentsOutput = [];
for (let i = 0, len = firstComponents.length; i < len; i++) {
    const key = firstComponents[i];
    if (typeof(Examples[key]) !== 'undefined') {
        const Example = Examples[key];
        componentsOutput.push(<SectionComponent name={key} key={`Section First ${i}`}><Example /></SectionComponent>);
    } else {
        console.warn(`Missing Example for First Component ${key}.`); // eslint-disable-line no-console
    }
}

const exampleComponents = Object.keys(Examples);
for (let i = 0, len = exampleComponents.length; i < len; i++) {
    const key = exampleComponents[i];
    if (firstComponents.indexOf(key) === -1) {
        const Example = Examples[key];
        componentsOutput.push(<SectionComponent name={key} key={`Section ${i}`}><Example /></SectionComponent>);
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

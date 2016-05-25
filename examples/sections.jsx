import React from 'react';
import Pod from 'utility/components.js';
import SectionComponent from './sectionComponent.jsx';
import SingleComponent from './pages/singleComponent.jsx';

const firstComponents = ['Hero', 'FixedElement', 'Parallax'];
const noName = ['Hero'];

const componentsOutput = [];
const exampleList = [];

const addComponent = function (key, i, type) {
    componentsOutput.push(<SectionComponent noName={noName} name={key} key={`Section ${type}${i}`} />);

    const route = (window.location.pathname !== '/') ? '/' : '#';
    // const reverse = (route === '/');

    exampleList.push(
        <Pod.List_Item key={key} styler={{ style: { height: 'auto', padding: '6px 16px' } }}>
            <Pod.Button styler={{ kind: 'base', type: 'text', dialog: true, style: { textAlign: 'left' } }} href={`http://localhost:3002${route}${key}`}>{key}</Pod.Button>
            <Pod.Block_Right>
                <Pod.Button styler={{ kind: 'base', dialog: true, type: 'text' }} href={`/${key}`}>
                    <Pod.Icon>launch</Pod.Icon>
                </Pod.Button>
            </Pod.Block_Right>
        </Pod.List_Item>
    );
};

for (let i = 0, len = firstComponents.length; i < len; i++) {
    const key = firstComponents[i];
    if (typeof(Pod.Examples[key]) !== 'undefined') {
        addComponent(key, i, 'First ');
    } else {
        console.warn(`Missing Example for First Component ${key}.`); // eslint-disable-line no-console
    }
}

const exampleComponents = Object.keys(Pod.Examples);
for (let i = 0, len = exampleComponents.length; i < len; i++) {
    const key = exampleComponents[i];
    if (firstComponents.indexOf(key) === -1) {
        addComponent(key, i, 'Second ');
    }
}

export default class Sections extends React.Component {
    static propTypes = {
        params: React.PropTypes.any,
    }

    render() {
        let examples = componentsOutput;

        if (typeof(this.props.params) !== 'undefined' && typeof(this.props.params.componentName) !== 'undefined') {
            examples = <SingleComponent params={this.props.params} />;
        }

        return (
            <div>
                <Pod.Pane>
                    <Pod.Grid>
                        <Pod.Grid_Cell styler={{ style: { padding: '0px 20px 0px 0px' }, md: 12, lg: 3, xl: 2 }}>
                            <Pod.FixedElement containerWidth alwaysFixed>
                                <Pod.Card styler={{ style: { width: '100%' } }}>

                                    <Pod.Card_Section styler={{ kind: 'title-small' }}>
                                        <Pod.Heading kind="h6" styler={{ secondary: true }}>
                                            <Pod.Button styler={{ kind: 'general', dialog: true, type: 'text', style: { color: '$palette.black', fontSize: '$font.size.large' } }} href={'http://localhost:3002'}>Examples</Pod.Button>
                                        </Pod.Heading>
                                    </Pod.Card_Section>

                                    <Pod.List styler={{ style: { maxHeight: 'calc(100vh - 100px)' } }}>
                                        <Pod.Scrollable>
                                            {exampleList}
                                        </Pod.Scrollable>
                                    </Pod.List>
                                </Pod.Card>
                            </Pod.FixedElement>
                        </Pod.Grid_Cell>
                        <Pod.Grid_Cell styler={{ md: 12, lg: 9, xl: 10 }}>
                            <Pod.Pane>
                                {examples}
                            </Pod.Pane>
                        </Pod.Grid_Cell>
                    </Pod.Grid>
                </Pod.Pane>
            </div>
        );
    }
}

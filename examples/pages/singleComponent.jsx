import React from 'react';
import Pod from 'utility/components.js';
import SectionComponent from '../sectionComponent.jsx';

export default class SingleComponent extends React.Component {
    static propTypes = {
        params: React.PropTypes.object,
    }

    render() {
        let componentName = this.props.params.componentName;
        componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);

        if (typeof(Pod.Examples[componentName]) !== 'undefined') {
            return (<div><SectionComponent name={componentName} /></div>);
        }
        return (<div>Error: Could not find an example for {componentName}.</div>);
    }

}

import React from 'react';
import { Section, ContentWrap, Heading, Examples } from 'utility/components.js';

module.exports = class SectionComponent extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
        noName: React.PropTypes.any,
    };

    render() {
        const Example = Examples[this.props.name];

        if (typeof(this.props.noName) !== 'undefined' && this.props.noName.indexOf(this.props.name) > -1) {
            return (<div id={this.props.name}><Example /></div>);
        }

        return (
            <div id={this.props.name}>
                <Section>
                    <ContentWrap>
                        <Heading>{this.props.name}</Heading>
                    </ContentWrap>
                    <Example />
                </Section>
            </div>
        );
    }
};

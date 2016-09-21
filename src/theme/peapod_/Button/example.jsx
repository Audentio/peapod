import React from 'react';
import { ContentWrap, Heading, Button } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class ButtonExample extends React.Component {

    shouldComponentUpdate = PureRender;

    makeAlert = () => {
        alert('test'); // eslint-disable-line no-alert
    }

    render() {
        return (
            <div>
                <ContentWrap>
                    <Heading kind="h4">Default</Heading>
                    <Button label="Default" />
                    <Button label="Base" styler={{ kind: 'base' }} />
                    <Button label="General" styler={{ kind: 'general' }} />
                    <Button label="Primary" styler={{ kind: 'primary' }} />
                    <Button label="Success" styler={{ kind: 'success' }} />
                    <Button label="Danger" styler={{ kind: 'danger' }} />
                    <Button label="Warning" styler={{ kind: 'warning' }} />

                    <br /><br />

                    <Heading kind="h4">Text</Heading>
                    <Button label="Default" styler={{ type: 'text' }} />
                    <Button label="Base" styler={{ type: 'text', kind: 'base' }} />
                    <Button label="General" styler={{ type: 'text', kind: 'general' }} />
                    <Button label="Primary" styler={{ type: 'text', kind: 'primary' }} />
                    <Button label="Success" styler={{ type: 'text', kind: 'success' }} />
                    <Button label="Danger" styler={{ type: 'text', kind: 'danger' }} />
                    <Button label="Warning" styler={{ type: 'text', kind: 'warning' }} />

                    <br /><br />
                    <Heading kind="h4">Bordered</Heading>
                    <Button label="Default" styler={{ type: 'bordered' }} />
                    <Button label="Base" styler={{ type: 'bordered', kind: 'base' }} />
                    <Button label="General" styler={{ type: 'bordered', kind: 'general' }} />
                    <Button label="Primary" styler={{ type: 'bordered', kind: 'primary' }} />
                    <Button label="Success" styler={{ type: 'bordered', kind: 'success' }} />
                    <Button label="Danger" styler={{ type: 'bordered', kind: 'danger' }} />
                    <Button label="Warning" styler={{ type: 'bordered', kind: 'warning' }} />

                    <br /><br />
                    <br /><br />
                    <Heading kind="h4">Button Options</Heading>
                    <Button label="Dialog" styler={{ kind: 'primary', dialog: true }} />
                    <Button label="Dense" styler={{ kind: 'primary', dense: true }} />
                    <Button label="Raised" styler={{ kind: 'primary', raised: true }} />
                    <Button label="Round" styler={{ kind: 'primary', round: true }} />
                    <Button label="Disabled" styler={{ kind: 'primary', disabled: true }} />
                    <Button label="Block" styler={{ kind: 'primary', block: true }} />
                    <Button label="Raised, Round, Disabled, Block" styler={{ kind: 'primary', raised: true, round: true, block: true, disabled: true }} />

                    <br /><br />
                    <Heading kind="h4">Basic Examples</Heading>
                    <Button styler={{ kind: 'base' }} onClick={this.makeAlert} label="onClick handler" />
                    <Button styler={{ kind: 'base' }} href="http://peaio" label="Anchor/Link" kind="primary" />
                </ContentWrap>
            </div>
        );
    }
};

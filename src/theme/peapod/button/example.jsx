import React from 'react';
import Pod from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class ButtonExample extends React.Component {

    shouldComponentUpdate = PureRender;

    makeAlert = () => {
        alert('test'); // eslint-disable-line no-alert
    }

    render() {
        return (
            <div>
                <Pod.ContentWrap>
                    <Pod.Heading kind="h4">Default</Pod.Heading>
                    <Pod.Button label="Default" />
                    <Pod.Button label="Base" styler={{ kind: 'base' }} />
                    <Pod.Button label="General" styler={{ kind: 'general' }} />
                    <Pod.Button label="Primary" styler={{ kind: 'primary' }} />
                    <Pod.Button label="Success" styler={{ kind: 'success' }} />
                    <Pod.Button label="Danger" styler={{ kind: 'danger' }} />
                    <Pod.Button label="Warning" styler={{ kind: 'warning' }} />

                    <br /><br />

                    <Pod.Heading kind="h4">Text</Pod.Heading>
                    <Pod.Button label="Default" styler={{ type: 'text' }} />
                    <Pod.Button label="Base" styler={{ type: 'text', kind: 'base' }} />
                    <Pod.Button label="General" styler={{ type: 'text', kind: 'general' }} />
                    <Pod.Button label="Primary" styler={{ type: 'text', kind: 'primary' }} />
                    <Pod.Button label="Success" styler={{ type: 'text', kind: 'success' }} />
                    <Pod.Button label="Danger" styler={{ type: 'text', kind: 'danger' }} />
                    <Pod.Button label="Warning" styler={{ type: 'text', kind: 'warning' }} />

                    <br /><br />
                    <Pod.Heading kind="h4">Bordered</Pod.Heading>
                    <Pod.Button label="Default" styler={{ type: 'bordered' }} />
                    <Pod.Button label="Base" styler={{ type: 'bordered', kind: 'base' }} />
                    <Pod.Button label="General" styler={{ type: 'bordered', kind: 'general' }} />
                    <Pod.Button label="Primary" styler={{ type: 'bordered', kind: 'primary' }} />
                    <Pod.Button label="Success" styler={{ type: 'bordered', kind: 'success' }} />
                    <Pod.Button label="Danger" styler={{ type: 'bordered', kind: 'danger' }} />
                    <Pod.Button label="Warning" styler={{ type: 'bordered', kind: 'warning' }} />

                    <br /><br />
                    <br /><br />
                    <Pod.Heading kind="h4">Button Options</Pod.Heading>
                    <Pod.Button label="Dialog" styler={{ kind: 'primary', dialog: true }} />
                    <Pod.Button label="Dense" styler={{ kind: 'primary', dense: true }} />
                    <Pod.Button label="Raised" styler={{ kind: 'primary', raised: true }} />
                    <Pod.Button label="Round" styler={{ kind: 'primary', round: true }} />
                    <Pod.Button label="Disabled" styler={{ kind: 'primary', disabled: true }} />
                    <Pod.Button label="Block" styler={{ kind: 'primary', block: true }} />
                    <Pod.Button label="Raised, Round, Disabled, Block" styler={{ kind: 'primary', raised: true, round: true, block: true, disabled: true }} />

                    <br /><br />
                    <Pod.Heading kind="h4">Basic Examples</Pod.Heading>
                    <Pod.Button styler={{ kind: 'base' }} onClick={this.makeAlert} label="onClick handler" />
                    <Pod.Button styler={{ kind: 'base' }} href="http://peapod.io" label="Anchor/Link" kind="primary" />
                </Pod.ContentWrap>
            </div>
        );
    }

};

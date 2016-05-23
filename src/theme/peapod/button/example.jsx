import React from 'react';
import Pod from 'components.js';

module.exports = class ButtonExample extends React.Component {

    makeAlert = () => {
        alert('test'); // eslint-disable-line no-alert
    }

    render() {
        return (
            <div>
                <Pod.ContentWrap>
                    <Pod.Button label="Default" />
                    <Pod.Button label="General" styler={{ kind: 'general' }} />
                    <Pod.Button label="Primary" styler={{ kind: 'primary' }} />
                    <Pod.Button label="Success" styler={{ kind: 'success' }} />
                    <Pod.Button label="Danger" styler={{ kind: 'danger' }} />
                    <Pod.Button label="Warning" styler={{ kind: 'warning' }} />

                    <br /><br />
                    <Pod.Button label="Raised" styler={{ kind: 'primary', raised: true }} />
                    <Pod.Button label="Round" styler={{ kind: 'primary', round: true }} />
                    <Pod.Button label="Disabled" styler={{ kind: 'primary', disabled: true }} />
                    <Pod.Button styler={{ kind: 'success', round: true, raised: true }} />
                    <Pod.Button styler={{ kind: 'base' }} onClick={this.makeAlert} label="onClick handler" />
                    <Pod.Button styler={{ kind: 'base' }} href="http://peapod.io" label="Anchor/Link" kind="primary" />

                    <br /><br /><br />

                    <Pod.Button label="Default" styler={{ type:'text' }} />
                    <Pod.Button label="General" styler={{ type:'text', kind: 'general' }} />
                    <Pod.Button label="Primary" styler={{ type:'text', kind: 'primary' }} />
                    <Pod.Button label="Success" styler={{ type:'text', kind: 'success' }} />
                    <Pod.Button label="Danger" styler={{ type:'text', kind: 'danger' }} />
                    <Pod.Button label="Warning" styler={{ type:'text', kind: 'warning' }} />

                    <br /><br /><br />

                    <Pod.Button label="Default" styler={{ type:'bordered' }} />
                    <Pod.Button label="General" styler={{ type:'bordered', kind: 'general' }} />
                    <Pod.Button label="Primary" styler={{ type:'bordered', kind: 'primary' }} />
                    <Pod.Button label="Success" styler={{ type:'bordered', kind: 'success' }} />
                    <Pod.Button label="Danger" styler={{ type:'bordered', kind: 'danger' }} />
                    <Pod.Button label="Warning" styler={{ type:'bordered', kind: 'warning' }} />

                </Pod.ContentWrap>
            </div>
        );
    }

};

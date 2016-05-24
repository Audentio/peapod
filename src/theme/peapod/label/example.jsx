import React from 'react';
import Pod from 'utility/components.js';

module.exports = class LabelExample extends React.Component {
    render() {
        return (
            <div>
                <Pod.ContentWrap>
                    <Pod.Label
                        icon="settings"
                        styler={{ kind: 'success', disabled: true, round: true }}
                    >
                        Test Label
                    </Pod.Label>
                </Pod.ContentWrap>
            </div>
        );
    }

}

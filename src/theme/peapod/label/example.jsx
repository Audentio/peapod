import React from 'react';
import Pod from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class LabelExample extends React.Component {

	shouldComponentUpdate = PureRender;
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

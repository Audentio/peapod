import React from 'react';
import { ContentWrap, Label } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class LabelExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <div>
                <ContentWrap>
                    <Label
                        icon="settings"
                        styler={{ kind: 'success', disabled: true, round: true }}
                    >
                        Test Label
                    </Label>
                </ContentWrap>
            </div>
        );
    }

};

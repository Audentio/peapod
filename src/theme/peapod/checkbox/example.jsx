import React from 'react';
import { ContentWrap, Checkbox } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class CheckboxExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <ContentWrap>
                <Checkbox name="Apples" label="Apples" />
            </ContentWrap>
        );
    }

};

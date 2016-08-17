import React from 'react';
import { ContentWrap, Radio } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class RadioExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <ContentWrap>
                <div>
                    <Radio id="ra1" group="group1" label="item 1" />
                    <Radio id="ra2" group="group1" label="item 2" />
                    <Radio id="ra3" group="group1" label="item 3" />
                    <Radio id="ra4" group="group1" label="item 4" />
                </div>
            </ContentWrap>
        );
    }

};

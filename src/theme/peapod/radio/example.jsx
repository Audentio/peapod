import React from 'react';
import Pod from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class AccordionExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <Pod.ContentWrap>
                <div>
                    <Pod.Radio id="ra1" group="group1" label="item 1" />
                    <Pod.Radio id="ra2" group="group1" label="item 2" />
                    <Pod.Radio id="ra3" group="group1" label="item 3" />
                    <Pod.Radio id="ra4" group="group1" label="item 4" />
                </div>
            </Pod.ContentWrap>
        );
    }

};

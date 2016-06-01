import React from 'react';
import Pod from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class AccordionExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <Pod.ContentWrap>
                {/* <Pod.Textarea value="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />*/}
            </Pod.ContentWrap>
        );
    }

};

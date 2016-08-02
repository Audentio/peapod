import React from 'react';
import Pod from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class AccordionExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <Pod.ContentWrap>
                <Pod.Mark>HTML Mark Element</Pod.Mark>
            </Pod.ContentWrap>
        );
    }

};

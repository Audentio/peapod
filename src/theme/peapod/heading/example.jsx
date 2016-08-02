import React from 'react';
import Pod from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class AccordionExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <Pod.ContentWrap>
                <Pod.Heading>Heading 1</Pod.Heading>
                <Pod.Heading kind="h2" preset="main">Heading 2</Pod.Heading>
                <Pod.Heading kind="h3">Heading 3</Pod.Heading>
                <Pod.Heading kind="h4">Heading 4</Pod.Heading>
                <Pod.Heading kind="h5">Heading 5</Pod.Heading>
                <Pod.Heading kind="h6">Heading 6</Pod.Heading>
            </Pod.ContentWrap>
        );
    }

};

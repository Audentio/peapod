import React, { Component } from 'react';
import { ContentWrap, Input, Heading, Paragraph, CodeBlock, Code, Strong, Button } from 'utility/components.js';

const Example_pure = `<Input type="text" value="You can't edit this" />`;
const Example_container = `ChangeHandler = (e) => {
    const { event, value, isValid } = e;

    console.log(event.target);

    this.setState({
        inputVal: value,
        validity: isValid,
    })
}

render() {
    return (
        <Input type="text" value={this.state.inputValue} onChange={this.ChangeHandler} />
    );
}`;

module.exports = class InputExample extends Component {

    render() {
        return (
            <ContentWrap>
                <Input type="text" placeholder="text" />
                <Input required type="text" placeholder="text*" />
                <Input type="email" placeholder="email" />
                <Input required validate type="email" placeholder="email*" />
                <Input type="password" placeholder="password" />
                <Input type="number" placeholder="number" />
                <Input type="text" placeholder="styled placeholder" styler={{ placeholderStyle: { color: 'indianred', textDecoration: 'underline', fontStyle: 'italic' } }} />
                <Input type="textarea" value="something else" />
            </ContentWrap>
        );
    }

};

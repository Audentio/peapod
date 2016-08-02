import React from 'react';
import Pod from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class AccordionExample extends React.Component {

    shouldComponentUpdate = PureRender;

    componentWillMount() {
        this.state = { value: 0 };
        setInterval(() => {
            const value = (this.state.value >= 100) ? 0 : this.state.value + 10;

            this.setState({ value });
        }, 300);
    }

    render() {
        return (
            <Pod.ContentWrap>
                <Pod.Card styler={{ style: { width: '100%', padding: '10px' } }}>
                    <Pod.Progress value={this.state.value}></Pod.Progress>
                </Pod.Card>
            </Pod.ContentWrap>
        );
    }

};

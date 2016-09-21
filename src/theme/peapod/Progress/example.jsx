import React from 'react';
import { ContentWrap, Card, Progress } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class ProgressExample extends React.Component {

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
            <ContentWrap>
                <Card styler={{ style: { width: '100%', padding: '10px' } }}>
                    <Progress value={this.state.value}></Progress>
                </Card>
            </ContentWrap>
        );
    }

};

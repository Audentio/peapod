import React, { Component } from 'react';
import { ContentWrap, Card, CircularProgress } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

const cardStyle = {
    style: {
        padding: 20,
        userSelect: 'none',
    },
};

module.exports = class CircularProgressExample extends Component {
    constructor(props, context) {
        super(props, context);

        this.types = ['base', 'primary', 'info', 'success', 'danger', 'warning', 'secondary'];
        this.nuts = false;

        this.state = {
            circles: [],
        };
    }

    getRandom = () => {
        const circles = [];
        this.types.forEach(type => {
            const random = Math.ceil(Math.random() * 100);
            circles.push(<CircularProgress key={type + '_circ'} value={random} styler={{ kind: type, style: { marginLeft: 15 } }}><span style={{ color: '#aaa' }}>{random}</span></CircularProgress>);
        });
        this.setState({ circles });
    }

    goNuts = e => {
        e.preventDefault();
        if (this.nuts) {
            clearInterval(this.nuts);
            this.nuts = false;
        } else {
            const _this = this;
            _this.nuts = setInterval(() => {
                _this.getRandom();
            }, 200);
        }
    }

    componentDidMount() {
        this.getRandom();
    }

    render() {
        return (
            <ContentWrap>
                <Card onClick={this.getRandom} styler={cardStyle}>
                    {this.state.circles}
                </Card>
            </ContentWrap>
        );
    }

};

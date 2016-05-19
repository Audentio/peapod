import React from 'react';
import Pod from 'components.js';

module.exports = class Progressing extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            value: 0,
            uniformValue: 0,
            btnText: 'pause',
        };

        this.loop = false;
        this.uLoop = false;
    }

    componentDidMount() {
        this.startLoop();
    }

    componentWillUnmount() {
        clearInterval(this.loop);
        clearInterval(this.uLoop);
        this.loop = false;
        this.uLoop = false;
    }

    startLoop() {
        const _this = this;
        this.loop = setInterval(() => {
            const currentValue = _this.state.value;
            _this.setState({
                value: currentValue + Math.floor(Math.random() * 10),
                uniformValue: _this.state.uniformValue + 1,
            });
            if (_this.state.value >= 100) {
                _this.setState({
                    value: 0, // GO AGAIN
                });
            }
        }, 500);
        this.uLoop = setInterval(() => {
            _this.setState({
                uniformValue: _this.state.uniformValue + 1,
            });
            if (_this.state.uniformValue >= 100) {
                _this.setState({
                    uniformValue: 0, // GO AGAIN
                });
            }
        }, 200);
    }

    toggleLoop(e) {
        e.preventDefault();
        if (this.loop) {
            clearInterval(this.loop);
            this.loop = false;
            clearInterval(this.uLoop);
            this.uLoop = false;
            this.setState({ btnText: 'resume' });
        } else {
            this.startLoop();
            this.setState({ btnText: 'pause' });
        }
    }

    render() {
        return (
            <div>
                <p style={{ marginBottom: '8px' }}>Natural progression example [<a href="#" onClick={this.toggleLoop}>{this.state.btnText}</a>]</p>
                <Pod.Progress value={this.state.value} />
                <br />
                <Pod.CircularProgress styler={{ size: 150 }} value={this.state.value}>
                    <div style={{ fontSize: 30, fontWeight: 200 }}>{this.state.value}%</div>
                    <span style={{ color: '#aaa' }}>progress...</span>
                </Pod.CircularProgress>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Pod.CircularProgress styler={{ size: 150, kind: 'success' }} value={this.state.uniformValue}>
                    <div style={{ fontSize: 26 }}>${this.state.uniformValue * 13}</div>
                    <span style={{ color: '#aaa' }}>Dollas!</span>
                </Pod.CircularProgress>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Pod.CircularProgress styler={{ size: 150, kind: 'danger' }} value={this.state.uniformValue}>
                    <span style={{ color: '#aaa' }}>{this.state.uniformValue * 3} bats</span>
                </Pod.CircularProgress>
            </div>
        );
    }
}

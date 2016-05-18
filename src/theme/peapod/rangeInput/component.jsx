/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React from 'react';
import Pod_Styler from 'styler.js';
import shallowCompare from 'react-addons-shallow-compare';

/**
*
* RangeInput description
*
*/
module.exports = class RangeInput extends React.Component {

    constructor(props, state) {
        super(props, state);

        this.previousClientX = null;

        const value_percentage = ((this.props.value - this.props.min) * 100) / (this.props.max - this.props.min);

        this.state = {
            value: this.props.value,
            handleLeft: `${value_percentage}%`,
        };
    }

    static propTypes = {
        name: React.PropTypes.string,
        value: React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.array,
        ]),
        min: React.PropTypes.number,
        max: React.PropTypes.number,
        step: React.PropTypes.number,
    }

    static defaultProps = {
        min: 0,
        max: 100,
        value: 0,
        step: 1,
    }

    updateHandle = (left) => {
        const value_percentage = (left / this.refs.track.offsetWidth) * 100;

        this.setState({
            handleLeft: left,
            value: Math.round((value_percentage * (this.props.max - this.props.min) / 100) + this.props.min),
        });
    }

    update = (val) => {
        const left = ((val - this.props.min) * 100) / (this.props.max - this.props.min);
        this.setState({
            handleLeft: `${left}%`,
            value: val,
        });
    }

    movementListener = (e) => {
        e.preventDefault();
        const track = this.refs.track;
        const track_left = track.getBoundingClientRect().left;
        let handle_left = e.clientX - track_left;

        if (handle_left < 0) handle_left = 0;
        if (handle_left > track.offsetWidth) handle_left = track.offsetWidth;

        this.updateHandle(handle_left);
    }

    trackHandler = (e) => {
        e.preventDefault();

        this.updateHandle(e.clientX - this.refs.track.getBoundingClientRect().left);
        this.startListening();
    }

    startListening = () => {
        this.setState({
            handleActive: true,
        });
        window.addEventListener('mousemove', this.movementListener);
        window.addEventListener('mouseup', this.stopListening);
    }

    stopListening = () => {
        this.setState({
            handleActive: false,
        });
        window.removeEventListener('mousemove', this.movementListener);
        window.removeEventListener('mouseup', this.stopListening);

        // update input, finally
        this.refs.input.value = this.state.value;
    }

    componentDidMount() {
        this.refs.handle.addEventListener('mousedown', this.startListening);
        this.refs.container.addEventListener('mousedown', this.trackHandler);
    }

    componentWillUnmount() {
        this.refs.handle.removeEventListener('mousedown', this.startListening);
        this.refs.container.removeEventListener('mousedown', this.trackHandler);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    componentWillReceiveProps(nextProps) {
        this.update(nextProps.value);
    }

    render() {
        const style = Pod_Styler.getStyle(this);

        return (
            <div ref="container" style={style.main}>
                <div ref="track" style={style.track}>
                    <input ref="input" type="text" style={style.input} name={this.props.name} defaultValue={this.props.value} />
                    <div ref="handle" style={[style.handle, { left: this.state.handleLeft }]}></div>
                </div>
                {this.state.value}
            </div>
        );
    }

};

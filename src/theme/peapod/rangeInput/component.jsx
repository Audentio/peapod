/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React, { PropTypes } from 'react';
import Pod_Styler from 'utility/styler.js';
import shallowCompare from 'react-addons-shallow-compare';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    constructor(props, state) {
        super(props, state);

        this.previousClientX = null;

        const value_percentage = ((this.props.value - this.props.min) * 100) / (this.props.max - this.props.min);

        this.state = {
            value: this.props.value,
            handleLeft: value_percentage || 0,
        };
    }

    static propTypes = {
        name: PropTypes.string,
        value: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.array,
        ]),
        min: PropTypes.number,
        max: PropTypes.number,
        step: PropTypes.number,
    }

    static defaultProps = {
        min: 0,
        max: 100,
        step: 1,
    }

    updateHandle = (left) => {
        const value_percentage = (left / this.refs.track.offsetWidth) * 100;

        this.setState({
            handleLeft: left || 0,
            value: Math.round((value_percentage * (this.props.max - this.props.min) / 100) + this.props.min),
        });
    }

    update = (val) => {
        const left = ((val - this.props.min) * 100) / (this.props.max - this.props.min);
        this.setState({
            handleLeft: left || 0,
            value: val,
        });
    }

    movementListener = (e) => {
        e.preventDefault();
        const track = this.refs.track;
        const track_left = track.getBoundingClientRect().left;
        const clientX = (e.touches === undefined) ? e.clientX : e.touches[0].clientX;
        let handle_left = clientX - track_left;

        if (handle_left < 0) handle_left = 0;
        if (handle_left > track.offsetWidth) handle_left = track.offsetWidth;

        this.updateHandle(handle_left);
    }

    trackHandler = (e) => {
        e.preventDefault();

        this.updateHandle(e.clientX - this.refs.track.getBoundingClientRect().left);
        this.startListening(e);
    }

    startListening = (e) => {
        this.movementListener(e);

        this.setState({
            handleActive: true,
        });
        window.addEventListener('mousemove', this.movementListener);
        window.addEventListener('mouseup', this.stopListening);
        window.addEventListener('touchmove', this.movementListener);
        window.addEventListener('touchend', this.stopListening);
    }

    stopListening = () => {
        this.setState({
            handleActive: false,
        });
        window.removeEventListener('mousemove', this.movementListener);
        window.removeEventListener('mouseup', this.stopListening);
        window.removeEventListener('touchmove', this.movementListener);
        window.removeEventListener('touchend', this.stopListening);

        // update input, finally
        this.refs.input.value = this.state.value;
    }

    componentDidMount() {
        this.refs.handle.addEventListener('mousedown', this.startListening);
        this.refs.handle.addEventListener('touchstart', this.startListening);
        this.refs.container.addEventListener('mousedown', this.trackHandler);
        this.refs.container.addEventListener('touchstart', this.trackHandler);

        this.update(this.props.value);
    }

    componentWillUnmount() {
        this.refs.handle.removeEventListener('mousedown', this.startListening);
        this.refs.container.removeEventListener('mousedown', this.trackHandler);
        this.refs.handle.removeEventListener('touchstart', this.startListening);
        this.refs.container.removeEventListener('touchstart', this.trackHandler);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    componentWillReceiveProps(nextProps) {
        this.update(nextProps.value);
    }

    render() {
        const classes = Pod_Styler.getClassStyle(this);

        return (
            <div ref="container" className={classes.main}>
                <div ref="track" className={classes.track}>
                    <div
                        style={Object.assign({
                            width: this.state.handleLeft,
                        }, classes.style.trackBackground)}
                    ></div> {/* for track % */}

                    <input ref="input" type="text" className={classes.input} name={this.props.name} defaultValue={this.props.value || this.props.min} />

                    <div
                        ref="handle"
                        style={[classes.style.handle, { left: this.state.handleLeft }]}
                    >
                        <div className={classes.handleFocus}>
                            <div style={[classes.style.handle, { left: '50%' }]}></div>
                        </div>{/* for focused */}
                    </div>
                </div>
                <br />
                {this.state.value}
            </div>
        );
    }
};

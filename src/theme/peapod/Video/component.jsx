/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React from 'react';
import Pod_Styler from 'utility/styler.js';
import PureRender from 'utility/pureRender.js';
import { Icon, Progress } from 'utility/components.js';
import Pod_Helper from 'utility/helper.js';
import moment from 'moment';

/**
*
* Video description
*
*/
module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    shouldComponentUpdate = PureRender;

    constructor(props, state) {
        super(props, state);

        this.lastScrollLeft = 0;
        this.playfn = null;
        this.prevAxis = null;
        this.durationFormat = 'mm:ss';

        this.state = {
            currentTime: 0,
            volume: 100,
            playing: false,
        };
    }

    static propTypes = {
        src: React.PropTypes.string.isRequired,
        poster: React.PropTypes.string,
        autoplay: React.PropTypes.bool,
        controls: React.PropTypes.bool,
        startFrom: React.PropTypes.string,
    }

    static defaultProps = {
        autoplay: false,
        controls: true,
    }

    durationString = (duration, reverse) => {
        if (reverse) {
            const parts = duration.split(':');
            let seconds = 0;

            if (parts.length === 1) { // Seconds
                Number(duration);
            } else if (parts.length === 2) { // MM:SS
                seconds = Number(parts[1]);
                seconds += 60 * Number(parts[0]);
            } else if (parts.length === 3) { // HH:MM:SS
                seconds = Number(parts[2]);
                seconds += 60 * Number(parts[1]);
                seconds += 60 * 60 * Number(parts[0]);
            }

            return seconds;
        }

        return moment().startOf('day').seconds(duration)
               .format(this.durationFormat);
    }

    keypressHandler = (e) => {
        const keymap = Pod_Helper.keymap;

        if (e.keyCode === keymap.SPACE) {
            e.preventDefault();
            this.playPause();
        }
    }

    swipeHandler = (e) => {
        if (this.state.playing === false) return;

        e.preventDefault();

        // Not supported by browser. *cough* IE
        if (e.deltaX === undefined) return;

        // added for direction fidelity
        const pull_x = 5;
        const pull_y = 5;

        let deltaX = e.wheelDeltaX;
        let deltaY = e.wheelDeltaY;
        // let direction = null

        if (this.prevAxis === 'X') {
            deltaX = deltaX + (Math.sign(e.wheelDeltaX) * pull_x);
            if (deltaX === 0) deltaX = deltaX + pull_x;
        } else if (this.prevAxis === 'Y') {
            deltaY = deltaY + (Math.sign(e.wheelDeltaY) * pull_y);
            if (deltaY === 0) deltaY = deltaY + pull_y;
        }

        if (Math.abs(deltaY) > Math.abs(deltaX)) {
            this.prevAxis = 'Y';
        } else {
            this.prevAxis = 'X';
        }


        if (this.prevAxis === 'X') {
        // Seek (up/down swipe)

            const seekToTime = this.refs.video.currentTime - e.deltaX;

            if (seekToTime < 0 || seekToTime > this.refs.video.duration) return;

            this.refs.video.currentTime = seekToTime;
            this.setState({
                currentTime: Math.ceil(this.refs.video.currentTime),
            });
        } else {
        // Volume Control

            const setVolumeTo = this.refs.video.volume + (e.deltaY / 200);

            if (setVolumeTo < 0 || setVolumeTo > 1) return;

            this.setVolume(setVolumeTo);
        }
    }

    bindEvents() {
        // meta-data loaded
        this.refs.video.addEventListener('loadedmetadata', () => {
            this.setState({
                duration: Math.floor(this.refs.video.duration),
            });
            this.durationFormat = (this.refs.video.duration >= 60 * 60) ? 'HH:mm:ss' : this.durationFormat;
        });

        // Keyboard Control
        this.refs.container.addEventListener('keydown', this.keypressHandler);

        // play-pause
        this.refs.playpause.addEventListener('click', this.playPause);

        // fullscreen
        this.refs.video.addEventListener('dblclick', this.fullscreen);

        // scroll seek
        this.refs.container.addEventListener('mousewheel', this.swipeHandler);

        // show-hide controls
        this.refs.container.addEventListener('mouseenter', this.hoveredState);
        this.refs.container.addEventListener('mouseleave', this.hoveredState);
    }

    unbindEvents() {
        this.refs.container.removeEventListener('mouseenter', this.hoveredState);
        this.refs.container.removeEventListener('mouseleave', this.hoveredState);
    }

    // play video
    play = () => {
        this.refs.video.play();
        this.setState({
            playing: true,
        });

        const updateTime = () => {
            this.setState({
                currentTime: Math.floor(this.refs.video.currentTime),
            });
        };

        updateTime();

        this.playfn = setInterval(updateTime, 1000);
    }

    // pause video
    pause = () => {
        this.refs.video.pause();
        this.setState({
            playing: false,
        });
        clearInterval(this.playfn);
    }

    // toggle play/pause
    playPause = () => {
        if (this.state.playing) {
            this.pause();
        } else {
            this.play();
        }
    }

    // Set volume
    setVolume = (volume) => {
        this.refs.video.volume = volume;

        this.setState({
            volume: (volume.toFixed(2) * 100).toFixed(0),
        });
    }

    // fullscreen toggle
    fullscreen = () => {
        Pod_Helper.fullscreen.toggle(this.refs.container);
        this.setState({
            fullscreen: Pod_Helper.fullscreen.isEnabled(),
        });
    }

    // Temporary hover stling fix
    hoveredState = (e) => {
        this.setState({ main_hovered: (e.type === 'mouseenter') });
    }
    // -- end

    componentDidMount() {
        this.bindEvents();
    }

    componentWillUnmount() {
        this.unbindEvents();
    }

    render() {
        const classes = Pod_Styler.getClassStyle(this);
        const seekbar_table_style = {
            display: 'table',
            width: '100%',
            height: classes.style.controls.height,
        };
        const { volume: currentVolume, currentTime, duration: currentDuration, playing } = this.state;

        const playPauseIcon = (playing) ? 'pause' : 'play_arrow';
        let volumeIcon = (currentVolume > 0) ? 'volume_up' : 'volume_mute';

        if (volumeIcon === 'volume_up' && currentVolume < 50) volumeIcon = 'volume_down';

        return (
            <div ref="container" className={classes.main} tabIndex={0}>
                <video
                    ref="video"
                    className={classes.video}
                    src={this.props.src}
                    controls={false}
                    autoPlay={this.props.autoplay}
                    poster={this.props.poster}
                >
                  Sorry, your browser doesn't support embedded videos
                </video>

                <div className={classes.controls}>
                    <div className={classes.playpause} ref="playpause">
                        <Icon className={classes.playpauseIcon}>{playPauseIcon}</Icon>
                    </div>

                    <div className={classes.seekbar}>
                        <div style={seekbar_table_style}>
                            <div className={classes.seekbar_time}>
                                {this.durationString(currentTime)}
                            </div>

                            <div className={classes.seekbar_bar}>
                                <Progress styler={classes.style.seekbar_progress} value={currentTime} max={currentDuration} />
                            </div>
                        </div>
                    </div>

                    <div className={classes.morecontrols}>
                        <Icon style={classes.style.volumeIcon}>{volumeIcon}</Icon> {currentVolume}
                    </div>
                </div>
            </div>
        );
    }

};

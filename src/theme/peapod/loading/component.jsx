/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React from 'react';
import Pod_Styler from 'utility/styler.js';
import { CircularProgress, Center } from 'utility/components.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;
    static propTypes = {
        children: React.PropTypes.any,
        show: React.PropTypes.bool,
    }

    static defaultProps = {
        loaded: 0,
        show: false,
    }

    constructor() {
        super();

        this.state = {
            loaded: 0,
            progress: 0,
            defaultLoaded: 50,
            hasLoaded: false,
        };
        this.interval = '';
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.show && this.props.show !== this.state.show && !this.props.loaded) {
            this.setState({
                show: true,
            });
            let goingUp = true;
            this.interval = setInterval(() => {
                let val = this.state.defaultLoaded;

                if (goingUp) {
                    val = val + 10;
                } else {
                    val = val - 10;
                }

                if (val > 70) {
                    goingUp = false;
                }
                if (val < 60) {
                    goingUp = true;
                }

                this.setState({ defaultLoaded: val });
            }, 300);
        }

        if (!nextProps.show) {
            this.setState({
                show: false,
                loaded: 0,
                progress: 0,
                defaultLoaded: 50,
                hasLoaded: false,
            });
            clearInterval(this.interval);
        }

        if (this.props.loaded) {
            clearInterval(this.interval);
            this.setState({
                hasLoaded: true,
                loaded: this.props.loaded,
            });
        }
    }

    render() {
        const style = Pod_Styler.getStyle(this);

        const scale = (this.state.hasLoaded) ? 1 : 0.5;
        const setVal = (this.state.hasLoaded) ? this.state.loaded : this.state.defaultLoaded;
        const rotateStyle = (this.state.hasLoaded) ? {} : style.rotate;

        const unloaded = (
            <div style={rotateStyle}>
                <CircularProgress
                    styler={{
                        kind: 'info',
                        stroke: 4,
                        style: { transform: `scale(${scale})`, transition: 'transform .3s' },
                    }}
                    value={setVal}
                />
            </div>
        );

        let loadinghtml = unloaded;

        return (
            <div style={style.main}>
                {this.props.children}
                <div style={style.spinner}>
                    <Center>
                        {loadinghtml}
                    </Center>
                </div>
            </div>
        );
    }

};

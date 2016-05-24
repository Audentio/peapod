/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React from 'react';
import Pod_Styler from 'utility/styler.js';
import { CircularProgress, Center } from 'utility/components.js';

module.exports = class Loading extends React.Component {
    static propTypes = {
        children: React.PropTypes.any,
    }

    static defaultProps = {
        loaded: 0,
        loading: false,
    }

    constructor() {
        super();

        this.state = {
            loaded: 0,
            progress: 0,
            defaultLoaded: 50,
            hasLoaded: false,
        };
    }

    componentWillReceiveProps() {
        if (this.props.show) {
            this.setState({
                loaded: 0,
                progress: 0,
                defaultLoaded: 50,
                hasLoaded: false,
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

        // test code
            setTimeout(() => {
                this.setState({ hasLoaded: true });

                clearInterval(this.interval);

                this.interval = setInterval(() => {
                    const loaded = (this.state.loaded < 100) ? this.state.loaded + 10 : 100;
                    this.setState({ loaded });

                    if (this.state.loaded >= 100) {
                        clearInterval(this.interval);
                        this.setState({ show: false });
                    }
                }, 1000);
            }, 5000);
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

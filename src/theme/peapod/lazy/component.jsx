/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

import React from 'react';
// import Pod_Styler from 'utility/styler.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    constructor(props, context) {
        super(props, context);

        this.state = {
            visible: props.visible,
            width: false,
            height: false,
        };
    }

    static defaultProps = {
        visible: false,
        distance: 100,
        placeholder: false,
        stay: true,
    }

    static propTypes = {
        placeholder: React.PropTypes.any,
        distance: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
        ]),
        visible: React.PropTypes.bool,
        stay: React.PropTypes.bool,
        width: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
        ]),
        height: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
        ]),
        children: React.PropTypes.any,
    }

    componentDidMount() {
        const elem = this.refs.LazyElement;

        const iObserver = new IntersectionObserver((elemRect) => {
            const visible = elemRect[0].intersectionRatio > 0;
            const rect = elemRect[0].boundingClientRect;

            if (visible !== this.state.visible) {
                this.setState({ visible });
            }

            if (!this.state.visible && rect.width !== this.state.height) {
                this.setState({
                    width: rect.width,
                    height: rect.height,
                });
            }

            if (this.props.stay && this.state.visible) {
                iObserver.unobserve(elem);
            }
        }, { threshold: [0], rootMargin: `${this.props.distance}% 0%` });

        iObserver.observe(elem);
    }

    render() {
        // const style = Pod_Styler.getStyle(this);

        const placeholder = (this.props.placeholder) ?
            this.props.placeholder : <div>&nbsp;</div>; // needed to allow scroll detection

        const height = this.state.height || this.props.height;
        const width = this.state.width || this.props.width;
        const newstyle = (!this.state.visible) ? { height, width } : {};

        return (
            <div
                style={newstyle}
                ref="LazyElement"
            >
                {(this.state.visible) ? this.props.children : placeholder}
            </div>
        );
    }

};

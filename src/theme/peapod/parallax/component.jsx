/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

import React from 'react';
import Pod_Styler from 'utility/styler.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    constructor() {
        super();

        this.onScroll = this.onScroll.bind(this);
    }

    static propTypes = {
        children: React.PropTypes.any,
    }

    componentWillMount() {
        let level = 0;
        const count = this.props.children.length;

        this.children = React.Children.map(this.props.children, child => {
            const newChild = React.cloneElement(child, { count, level });
            level++;
            return newChild;
        });
    }

    onScroll(parallax, windowHeight) {
        document.addEventListener('scroll', () => {
            const rect = parallax.getBoundingClientRect();
            const scroll = ((rect.top) - (windowHeight / 2));
            parallax.scrollTop = -scroll;
        });
    }

    componentDidMount() {
        const parallax = this.refs.Parallax;
        const windowHeight = window.innerHeight;

        if (window.IntersectionObserver) {
            const _this = this;
            const iObserver = new IntersectionObserver(() => {
                _this.onScroll(parallax, windowHeight);
                iObserver.unobserve(parallax);
            }, { threshold: [0.0] });
            iObserver.observe(parallax);
        } else {
            this.onScroll(parallax, windowHeight);
        }
    }

    render() {
        const style = Pod_Styler.getStyle(this);

        return (
            <div style={style.main} ref="Parallax">
                <div style={style.group}>
                    {this.children}
                </div>
            </div>
        );
    }
};

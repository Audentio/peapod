/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


// Dependencies
import React from 'react';
import Pod_Styler from 'utility/styler.js';

/**
* Parallax component
* @element Code
*/
module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    constructor() {
        super();

        this.onScroll = this.onScroll.bind(this);
        // document.addEventListener('scroll', this.onScroll, false);
    }

    componentWillMount() {
        let level = 0;
        let count = this.props.children.length;

        this.children = React.Children.map(this.props.children, child => {
            const newChild = React.cloneElement(child, { count, level });
            level++;
            return newChild;
        });
    }

    onScroll(parallax, windowHeight) {
        document.addEventListener('scroll', function () {
            const rect = parallax.getBoundingClientRect();
            const scroll = ((rect.top) - (windowHeight / 2));
            parallax.scrollTop = -scroll;
        });
    }

    componentDidMount() {
        const parallax = this.refs.Parallax;
        const windowHeight = window.innerHeight;

        if (window.IntersectionObserver) {
            let observing = false;
            const _this = this;
            const iObserver = new IntersectionObserver(function () {
                if (observing) { return; }
                observing = true;

                _this.onScroll(parallax, windowHeight);

            }, { threshold: [0.0] });
            iObserver.observe(parallax);
        } else {
            this.onScroll(parallax, windowHeight);
        }
        this.onScroll(parallax, windowHeight);
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

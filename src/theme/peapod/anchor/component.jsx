/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


// Dependencies
import { Link } from 'react-router';
import React from 'react';
import Pod_Styler from 'utility/styler.js';

/**
* Anchor component
* @element Code
*/
module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    constructor() {
        super();

        this.onClick = this.onClick.bind(this);
    }

    static defaultProps = {
        internal: false,
    }

    static contextTypes = {
        store: React.PropTypes.object,
    }

    componentDidMount() {
        this.store = this.context.store;
    }

    onClick() {
        if (/#/g.test(this.props.to)) {
            const elem = document.querySelector(this.props.to.replace('http://localhost:3002', ''));


            const elemRectInit = elem.getBoundingClientRect();

            const origionalPosition = elemRectInit.top + window.scrollY;
            const store = this.store.getState().fixed;
            let extra = 0;

            for (let i = 0; i < store.length; i++) {
                if (origionalPosition > store[i].top + store[i].height) {
                    extra += store[i].height;
                }
            }

            window.scrollTo(0, origionalPosition - extra);
        }
    }

    render() {
        const style = Pod_Styler.getStyle(this);

        const regex = /^(https?:\/\/|ftp:\/\/)/g;
        if (regex.test(this.props.to) && !this.props.internal) {
            return (
                <a
                    style={style.main}
                    href={this.props.to}
                    ref={(ref) => { this.anchor = ref; }}
                    onClick={(e) => { this.onClick(); e.preventDefault(); return false; }}
                >
                    {this.props.children}
                </a>
            );
        } else {
            return (
                <Link
                    style={style.main}
                    to={`${this.props.to}`}
                    ref={(ref) => { this.anchor = ref; }}
                >
                    {this.props.children}
                </Link>
            );
        }
    }

};

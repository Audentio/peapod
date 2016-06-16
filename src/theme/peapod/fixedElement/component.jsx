/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

import React from 'react';
import Pod_Styler from 'utility/styler.js';
// import { connect } from 'react-redux';
import { addFixed } from '../../../../examples/actions';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    constructor() {
        super();
        this.onScroll = this.onScroll.bind(this);
    }

    static propTypes = {
        onScroll: React.PropTypes.bool,
        containerWidth: React.PropTypes.bool,
        alwaysFixed: React.PropTypes.bool,
        addToScroll: React.PropTypes.bool,
        children: React.PropTypes.any,
    }

    static defaultProps = {
        onScroll: true,
        containerWidth: false,
        addToScroll: false,
    }

    static contextTypes = {
        store: React.PropTypes.object,
    }

    shouldComponentUpdate() {
        return true;
    }

    componentDidMount() {
        const elementInit = this.fixedElem;
        const elemRectInit = elementInit.getBoundingClientRect();

        this.origionalPosition = elemRectInit.top + window.scrollY;
        const origionalHeight = elementInit.scrollHeight;
        // const alwaysFixed = this.origionalPosition === 0 || this.props.alwaysFixed;
        const alwaysFixed = this.props.alwaysFixed;

        this.state = {
            position: 'relative',
            origionalHeight,
            width: '100%',
            alwaysFixed,
        };

        if (this.state.alwaysFixed) {
            this.onScroll(elemRectInit);
        } else {
            document.addEventListener('scroll', this.onScroll);
        }

        window.addEventListener('resize', this.onScroll);

        const { store } = this.context;
        if (this.props.addToScroll) {
            store.dispatch(addFixed(this.origionalPosition, origionalHeight));
        }
    }

    onScroll(elemRect = null) {
        const element = this.fixedElem;
        if (typeof(element) !== 'undefined' && element !== null) {
            if (elemRect === null) {
                elemRect = element.getBoundingClientRect();
            }

            this.origionalPosition = elemRect.top + window.scrollY;
            const doc = document.documentElement;
            const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

            console.log(top, this.origionalPosition);
            const positionStyle = (top > this.origionalPosition || this.state.alwaysFixed) ? 'fixed' : 'relative';

            let containerWidth = '100%';

            if (this.props.containerWidth && positionStyle === 'fixed') {
                containerWidth = element.offsetWidth;
            }

            if (this.state.position !== positionStyle || this.state.width !== containerWidth) {
                this.setState({
                    position: positionStyle,
                    width: containerWidth,
                });
            }
        }
    }

    render() {
        const style = Pod_Styler.getStyle(this);
        style.main.position = this.state.position;

        if (this.props.containerWidth) {
            style.main.width = this.state.width;
        }

        const scrolledStyles = (this.state.position === 'fixed') ? Object.assign({}, style.main, style.scrolled) : style.main;

        const fixedStyle = {
            height: this.state.origionalHeight,
            // transform: 'translate3d(0, 0, 0)'
        };

        if (this.props.onScroll) {
            return (
                <div style={fixedStyle} ref={(ref) => { this.fixedElem = ref; }}>
                    <div style={scrolledStyles}>
                        {this.props.children}
                    </div>
                </div>
            );
        }
        return (
            <div style={style.main}>
                {this.props.children}
            </div>
        );
    }
};

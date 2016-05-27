/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

// Dependencies
import React from 'react';
import Pod_Styler from 'utility/styler.js';

/**
* Lazy component
* @element Code
*/
module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    constructor() {
        super();

        this.state = {
            visible: this.props.visible,
        };
    }

    static defaultProps = {
        visible: false,
        // distance: 100,
        placeholder: false,
    }

    static propTypes = {
        placeholder: React.PropTypes.any,
        visible: React.PropTypes.bool,
        children: React.PropTypes.any,
    }

    componentDidMount() {
        const elem = this.refs.LazyElement;

        const iObserver = new IntersectionObserver((elemRect) => {
            console.log(elemRect);
            this.setState({ visible: elemRect[0].intersectionRatio > 0 });
        }, { threshold: [0], rootMargin: '200% 0%' });
        iObserver.observe(elem);
    }

    // componentDidMount() {
    //
    //     // initial check
    //     this.lazyCheck();
    //
    //     // bind this to lazy check always
    //     this.lazyCheck = this.lazyCheck.bind(this);
    //
    //     // start listening for viewport events
    //     window.addEventListener('scroll', this.lazyCheck);
    //     window.addEventListener('resize', this.lazyCheck);
    //
    // }
    //
    // lazyCheck() {
    //     var element = this.refs.LazyElement;
    //     var bounds = element.getBoundingClientRect();
    //     var scrollTop = window.pageYOffset;
    //     var top = bounds.top + scrollTop;
    //     var height = bounds.bottom - bounds.top;
    //     var distance = this.props.distance;
    //
    //     if (top === 0 || (top <= (scrollTop + window.innerHeight + distance) && (top + height + distance) > scrollTop)) {
    //         this.setState({ visible: true });
    //         this.removeListener(); // stop listening, the show is over
    //     }
    // }

    // removeListener() {
    //     window.removeEventListener('scroll', this.lazyCheck);
    //     window.removeEventListener('resize', this.lazyCheck);
    // }

    render() {
        const style = Pod_Styler.getStyle(this);

        const placeholder = (this.props.placeholder) ? this.props.placeholder : '';
        const children = (this.state.visible) ? this.props.children : placeholder;

        const content = (this.state.visible) ? children : placeholder;

        return (
            <div style={style.main} ref="LazyElement">
                {content}
            </div>
        );
    }

};

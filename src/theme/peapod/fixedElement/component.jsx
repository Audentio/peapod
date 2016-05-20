/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


// Dependencies
import React from 'react';
import Pod_Styler from 'styler.js';


/**
* Template component
*
* @element Pod_modal
*
*/
module.exports = class FixedElement extends React.Component {

    constructor() {
        super();
        this.state = {
            position: 'static',
            origionalHeight: 0,
            width: '100%',
        };
    }

    static propTypes = {
        onScroll: React.PropTypes.bool,
        containerWidth: React.PropTypes.bool,
        children: React.PropTypes.any,
    }

    static defaultProps = {
        onScroll: true,
        containerWidth: false,
    }

    shouldComponentUpdate() {
        return true;
    }

    componentDidMount() {
        const elementInit = this.fixedElem;
        const elemRectInit = elementInit.getBoundingClientRect();

        let containerWidthInit = '100%';

        if (this.props.containerWidth) {
            containerWidthInit = elementInit.offsetWidth;
        }

        this.origionalPosition = elemRectInit.top + window.scrollY;
        this.setState({ // eslint-disable-line react/no-did-mount-set-state
            origionalHeight: elementInit.scrollHeight,
            width: containerWidthInit,
        });

        document.addEventListener('scroll', () => {
            const element = this.fixedElem;
            const elemRect = element.getBoundingClientRect();

            this.origionalPosition = elemRect.top + window.scrollY;
            const doc = document.documentElement;
            const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

            const positionStyle = (top > this.origionalPosition) ? 'fixed' : 'static';

            if (this.state.position !== positionStyle) {
                let containerWidth = '100%';

                if (this.props.containerWidth) {
                    containerWidth = element.offsetWidth;
                }

                this.setState({
                    position: positionStyle,
                    width: containerWidth,
                });
            }
        });

        window.addEventListener('resize', () => {
            const element = this.fixedElem;
            const elemRect = element.getBoundingClientRect();

            this.origionalPosition = elemRect.top + window.scrollY;
            const doc = document.documentElement;
            const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

            const positionStyle = (top > this.origionalPosition) ? 'fixed' : 'static';

            let containerWidth = '100%';

            if (this.props.containerWidth) {
                containerWidth = element.offsetWidth;
            }

            this.setState({
                position: positionStyle,
                width: containerWidth,
            });
        });
    }

    render() {
        const style = Pod_Styler.getStyle(this);
        style.main.position = this.state.position;

        if (this.props.containerWidth) {
            style.main.width = this.state.width;
        }

        const fixedStyle = {
            height: this.state.origionalHeight,
            // transform: 'translate3d(0, 0, 0)'
        };

        if (this.props.onScroll) {
            return (
                <div style={fixedStyle} ref={(ref) => this.fixedElem = ref}>
                    <div style={style.main} >
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

/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

//Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

var Pod_Styler = require('../styler.js');
var Wrapper = require('../wrapper.jsx')

/**
* Lazy component
* @element Code
*/
class Lazy extends React.Component {

    defaultProps = {
        visible: false,
        distance: 100,
        placeholder: false
    }

    componentDidMount() {

        //initial check
        this.lazyCheck();

        // bind this to lazy check always
        this.lazyCheck = this.lazyCheck.bind(this)

        //start listening for viewport events
        window.addEventListener('scroll', this.lazyCheck)
        window.addEventListener('resize', this.lazyCheck)

    }

    lazyCheck() {
        var element = this.refs.LazyElement
        var bounds    = element.getBoundingClientRect();
        var scrollTop = window.pageYOffset;
        var top       = bounds.top + scrollTop;
        var height    = bounds.bottom - bounds.top;
        var distance  = this.props.distance;

        if (top === 0 || (top <= (scrollTop + window.innerHeight + distance) && (top + height + distance) > scrollTop) ){
            this.setState({visible: true});
            this.removeListener(); //stop listening, the show is over
        }
    }

    removeListener() {
        window.removeEventListener('scroll', this.lazyCheck);
        window.removeEventListener('resize', this.lazyCheck);
    }

    render() {
        var style = Pod_Styler.getStyle(this);

        var placeholder = (this.props.placeholder) ? this.props.placeholder : '';
        var children = (this.state.visible) ? this.props.children : placeholder;

        return (
            <div style={style.main} ref='LazyElement'>
                {children}
            </div>
        );

    }

};

module.exports = Wrapper(Lazy);

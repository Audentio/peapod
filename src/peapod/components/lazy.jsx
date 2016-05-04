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
        visible: false
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
        var element = this.refs.fixedElem
        console.log(element)
        var bounds = element.getBoundingClientRect(),
        scrollTop = window.pageYOffset,
        top = bounds.top + scrollTop,
        height = bounds.bottom - bounds.top;
        var dist = 100;

        if(top === 0 || (top <= (scrollTop + window.innerHeight + dist) && (top + height + dist) > scrollTop)){
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

        var children = (this.state.visible) ? this.props.children : '';

        return (
            <div style={style.main} ref='fixedElem'>
                {children}
            </div>
        );

    }

};

module.exports = Wrapper(Lazy);

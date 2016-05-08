/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


//Dependencies
import React from 'react';
import Pod_Styler from 'styler.js';
import Wrapper from 'wrapper.jsx';


/**
* Template component
*
* @element Pod_modal
*
*/
class Modal extends React.Component {

    constructor() {
        super();
        // this.state = {
        //     hidden: false
        // };
    }

    render() {
        var style = Pod_Styler.getStyle(this);

        // var html = !this.state.hidden ? () : (<div />);

        var modalBox = (
            <div style={style.main}>
                {this.props.children}
            </div>
        );

        return (this.props.overlay) ?  (
            <Pod.overlay>
                {modalBox}
            </Pod.overlay>
        ) : modalBox

    }

};

Modal.defaultProps = {
    overlay: true
};

module.exports = Wrapper(Modal);

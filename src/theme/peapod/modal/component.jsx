/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


// Dependencies
import React from 'react';
import Pod_Styler from 'utility/styler.js';


/**
* Template component
*
* @element Pod_modal
*
*/
module.exports = class Modal extends React.Component {

    constructor() {
        super();
        // this.state = {
        //     hidden: false
        // };
    }

	static defaultProps = {
	    overlay: true
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

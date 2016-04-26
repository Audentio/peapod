/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


//Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

var Pod_Styler = require('../styler.jsx');
var Wrapper = require('../wrapper.jsx')


/**
* Template component
*
* @element Pod_modal
*
*/
class Modal extends React.Component {

    constructor() {
        super();
        this.state = {
            hidden: false
        };
    }

    render() {
        var style = Pod_Styler.getStyle(this);

        // var html = !this.state.hidden ? () : (<div />);

        var modalBox = (
            <div style={style.main}>
                <h2>{this.props.title}</h2>
                <p>{this.props.text}</p>
                <br/>
                <Pod.button label="Hide" styler={{kind: 'success'}} onClick={() => {this.setState({hidden: true})}
                } />
                <Pod.button label="Undo" styler={{kind: 'danger'}} />
            </div>
        );

        return (this.props.overlay) ?  (
            <Pod.overlay children={modalBox} />
        ) : modalBox

    }

};

Modal.defaultProps = {
    overlay: true
};

module.exports = Wrapper(Modal);

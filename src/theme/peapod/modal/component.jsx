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
module.exports = function (componentName) {
    return class Pod_Component extends React.Component {

        static displayName = componentName;

        constructor() {
            super();
            // this.state = {
            //     hidden: false
            // };
        }

        static defaultProps = {
            overlay: true,
        }

        render() {
            const style = Pod_Styler.getStyle(this);

            // var html = !this.state.hidden ? () : (<div />);

            const modalBox = (
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
};

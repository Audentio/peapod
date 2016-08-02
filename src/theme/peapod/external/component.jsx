/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React from 'react';
import Pod_Styler from 'utility/styler.js';


module.exports = componentName => class Pod_Component extends React.Component {


    static displayName = componentName;

    render() {
        return <div />;
    }

    componentDidMount() {
        var node = ReactDOM.findDOMNode(this);
        var ele = document.getElementById(this.props.getID);
        if (typeof(ele) !== 'undefined') {
            node.innerHTML = document.getElementById(this.props.getID).innerHTML;
            ele.style.display = 'none';
        }
    }
};

/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

import React from 'react';
import Pod_Styler from 'styler.js';
import {Icon} from 'components.js';


/**
* Tooltip component
*
* @element Pod_alert
* @param {boolean} [dismissable=true] - Allow user to dismiss alert
* @param {string} [ID] - Unique identifier for persistent state storage
*
*/
module.exports = class Tooltip extends React.Component {
	static defaultProps = {
	    show: false,
	    hovering: false, // to add
	    arrow: false // to add
	}

	componentWillMount() {
	    var {show, hovering} = this.props
	    this.state = {show, hovering}
	}

	componentWillReceiveProps(nextProps) {
	    var {show, hovering} = nextProps
	    this.setState({show, hovering})
	}

	render() {
	    var style = Pod_Styler.getStyle(this);

	    var tooltip = (this.props.show) ? (
	        <div style={style.tooltip}>
	           <div style={style.arrow}></div>
	           <div>{this.props.children}</div>
	        </div>
	    ) : '';

	    return (
	        <div style={style.main}>
	            {tooltip}
	        </div>
	    );

	}
};

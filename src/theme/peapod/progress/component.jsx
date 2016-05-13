/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

 import React from 'react';
 import Pod_Styler from 'styler.js';

/**
* Icon component
*
* @element Pod_icon
* @param {number} [vaulue=-1] - Progress value. Negative values render indeterminate progress
* @param {string} [max=100] - Max value. Default is 100 so `value` is basically a percentage unless max is changed
*/
module.exports = class Progress extends React.Component {

    constructor(props, context){

        super(props, context)

        this.getScale = this.getScale.bind(this)
    }

	static propTypes = {
		value: 			React.PropTypes.number,
		max: 			React.PropTypes.number
	}

	static defaultProps = {
		value: -1,
		max: 100
	}

	getScale() {
		var progress = (this.props.value < 0) ? 0 : this.props.value;
		var scale = progress/this.props.max;
		return {
            transform: `scaleX(${scale})`
        };
	}

	render() {
		var style = Pod_Styler.getStyle(this);

		return (
			<div style={style.main}>
			    <div style={[style.progress, this.getScale()]}></div>
			</div>
		)
	}

};

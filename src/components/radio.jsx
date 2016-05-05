/* Copyright <%= package.year %>, Audentio, LLC.
 * All rights reserved.
 *
 * LICENSE: <%= package.licence %>
 */

import React from 'react'
import Wrapper from '../wrapper.jsx'
import Pod_Styler from '../styler.js'
import Icon from './icon.jsx'

/**
* Radio component (single radio item)
*
* @element Radio
*
* @param {string} group - radio group
* @param {string} [label] - radio label
*
*/

var Radio = React.createClass({

    propTypes: {
        group: React.PropTypes.string.isRequired,
        label: React.PropTypes.string
    },

	getInitialState() {
		return {
			checked: this.props.checked == true,
		}
	},

	onChangeHandler(e){
		if (typeof(this.props.onChange) !== 'undefined') this.props.onChange(e.target.checked);

        var RadiosInGroup = document.getElementsByName(this.props.group);
        if(!window.peapod__radioLoop){
            window.peapod__radioLoop = true;
            for(var x=0;x<RadiosInGroup.length;x++){
                var current = RadiosInGroup[x];
                var evt = new UIEvent("click", {
                    view: window,
                    bubbles: true,
                    cancelable: true,
                    data: "tushar"
                });
                current.dispatchEvent(evt);
            }
            window.peapod__radioLoop = false;
        }

        this.setState({ checked: this.refs.input.checked })
	},

	componentWillReceiveProps(nextProps) {
		if (typeof(nextProps.checked) !== 'undefined') {
			this.setState({
				checked: nextProps.checked == true
			})
		}
	},

	componentWillMount() {
		if (typeof(this.props.onChange) !== 'undefined') this.props.onChange(this.state.checked);
	},

	render(){
        var style = Pod_Styler.getStyle(this);
		return (
			<div ref="main" style={style.wrapper_outer}>
				<label style={style.wrapper_inner}>
					<span style={style.radio_outer}>
                        <span style={style.radio_inner}></span>
						<input ref="input" type="radio" style={style.radio_element} onChange={this.onChangeHandler} name={this.props.group} {...this.props} />
					</span>
					<span style={style.label} >{this.props.label}</span>
				</label>
			</div>
		);
	}
})

module.exports = Wrapper(Radio);

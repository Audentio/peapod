/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { Pod_animation } from './animation.jsx'
import _ from 'lodash'
import Pod_Styler from '../styler.jsx'
import Wrapper from '../wrapper.jsx'

var CircularProgress = React.createClass({

	propTypes: {
		value: 			React.PropTypes.number,
		max: 			React.PropTypes.number
	},

	getDefaultProps() {
		return {
			value: 0,
			max: 100
        }
	},

    getTransform(){
        return {
            transform: `rotate(${this.props.value*1.8}deg)`
        };
    },

    render() {
		var style_main = Pod_Styler.getStyle(this),
			style_track = Pod_Styler.getStyle(this, 'track'),
			style_mask = Pod_Styler.getStyle(this, 'mask'),
			style_circle = [Pod_Styler.getStyle(this, 'circle'), this.getTransform()],
			style_content = Pod_Styler.getStyle(this, 'content'),
			style_contentInner = Pod_Styler.getStyle(this, 'contentInner')

        return (
            <div style={style_main}>

                <div style={style_track}></div>

            	<div style={[style_mask, this.getTransform()]}><div style={style_circle}></div></div>
				<div style={style_mask}><div style={style_circle}></div></div>

                <div style={style_content}>
                    <div style={style_contentInner}>
                        {this.props.children}
                    </div>
                </div>

            </div>
        )
    }

})

module.exports = Wrapper(CircularProgress)

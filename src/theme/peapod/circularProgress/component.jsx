/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

 import React from 'react';
 import Pod_Styler from 'styler.js';

module.exports = class CircularProgress extends React.Component {
	static propTypes = {
		value: 			React.PropTypes.number,
		max: 			React.PropTypes.number
	}

	static defaultProps = {
		value: 0,
		max: 100
	}

	getTransform(){
        return {
            transform: `rotate(${this.props.value*1.8}deg)`
        };
    }

    render() {
		var style = Pod_Styler.getStyle(this);

        return (
            <div style={style.main}>

                <div style={style.track}></div>

            	<div style={[style.mask, this.getTransform()]}><div style={[style.circle, this.getTransform()]}></div></div>
				<div style={style.mask}><div style={[style.circle, this.getTransform()]}></div></div>

                <div style={style.content}>
                    <div style={style.contentInner}>
                        {this.props.children}
                    </div>
                </div>

            </div>
        )
    }
}

/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

 import React from 'react';
 import Pod_Styler from 'styler.js';
 import PureRender from 'pureRender';

 module.exports = class Table_Control extends React.Component {

    //shouldComponentUpdate = PureRender;

	render() {
		var style = Pod_Styler.getStyle(this);

		return (
			<div style={style.main}>
				{this.props.children}
			</div>
		);
	}
};

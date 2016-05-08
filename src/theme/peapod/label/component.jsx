import React from 'react';
import Pod_Styler from 'styler.js';
import Wrapper from 'wrapper.jsx';

import {Icon} from 'components.js';

var Label = React.createClass({

	render: function() {
		var style = Pod_Styler.getStyle(this);

		var icon = (typeof(this.props.icon) !== 'undefined' && this.props.icon.length) ? <Pod_icon styler={{style: style.icon}}>{this.props.icon}</Pod_icon> : null

		return (
			<div style={style.main}>
				{icon} {this.props.children}
			</div>
		)
	}
});

module.exports = Wrapper(Label);

import React from 'react';
import Pod_Styler from 'styler.js';
import Wrapper from 'wrapper.jsx';

import {Icon} from 'components.js';

var Label = React.createClass({

	render: function() {
		var style = Pod_Styler.getStyle(this);

		var icon = (typeof(this.props.icon) !== 'undefined' && this.props.icon.length) ? <Icon styler={{style: style.icon}}>{this.props.icon}</Icon> : null

		return (
			<div style={style.main}>
				{icon} {this.props.children}
			</div>
		)
	}
});

module.exports = Wrapper(Label);

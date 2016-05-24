import React from 'react';
import Pod_Styler from 'utility/styler.js';

import {Icon} from 'utility/components.js';

module.exports = class Label extends React.Component {

	render() {
		var style = Pod_Styler.getStyle(this);

		var icon = (typeof(this.props.icon) !== 'undefined' && this.props.icon.length) ? <Icon styler={{style: style.icon}}>{this.props.icon}</Icon> : null

		return (
			<div style={style.main}>
				{icon} {this.props.children}
			</div>
		)
	}
};

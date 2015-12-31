/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';
var Pod_Styler = require('../styler.jsx');

var Pod_tableCell = React.createClass({

	shouldComponentUpdate: function(nextProps, nextState) {
		return nextProps !== this.props
	},

	render: function() {
		var column = this.props.column,
			index = this.props.index;

		return (
			<div {...this.props}
				style={Pod_Styler.getStyle({props: {
					styler: {
						styleLike: 'Pod_tableCell',
						firstCell: index == 0,
						centered: column.centered == true,
						hovered: column.hovered == true,
						sortable: column.sortable == true,
						sortAsc: column.sort == 'asc',
						sortDesc: column.sort == 'desc',
						sortAsc: column.sort == 'asc',
						sortDesc: column.sort == 'desc',
						header: this.props.header == true
					}
				}})}
			>
				{this.props.children}
			</div>
		)
	}
})

module.exports = Radium(Pod_tableCell);

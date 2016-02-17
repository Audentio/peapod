/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

import React from 'react';
import ReactDOM from 'react-dom';
var Pod_Styler = require('../styler.jsx');
var Wrapper = require('../wrapper.jsx')


var lodash = require('lodash')

var TableCell = React.createClass({

	shouldComponentUpdate: function(nextProps, nextState) {
		return true;
		//return !lodash.isEqual(nextProps, this.props)
	},

	render: function() {
		var column = this.props.column || {
				centered: false,
				hovered: false,
				sort: '',
				header: false
			},
			index = this.props.index;

		return (
			<div {...this.props}
				style={Pod_Styler.getStyle({props: {
					styler: {
						styleLike: 'TableCell',
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

module.exports = Wrapper(TableCell);

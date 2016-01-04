/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';
var Pod_Styler = require('../styler.jsx');

var lodash = require('lodash')
var reduce = lodash.reduce;
var isPlainObject = lodash.isPlainObject;
var isUndefined = lodash.isUndefined;

var Pod_tableCell = require('./tableCell.jsx');

var Pod_tableRow = React.createClass({

	shouldComponentUpdate: function(nextProps, nextState) {
		//return true;
		return !lodash.isEqual(nextProps, this.props)
	},

	render: function() {
		var row = this.props.row,
			rowKey = this.props.rowKey,
			i = this.props.i,
			rowProps = this.props.rowProps,
			hoveredRow = this.props.hoveredRow,
			columns = this.props.columns,
			data = this.props.data;

		return (
			<div {...rowProps(row, i)}
				style={Pod_Styler.getStyle({props: {
					styler: {
						styleLike: 'Pod_tableInner',
						dark: i % 2 == 1,
						firstRow: i == 0,
						checked: row.checked == true,
						hovered: hoveredRow == i
					}
				}}, 'row')}
			>
				{
					columns.map(function(column, j) {
						var property = column.property,
						value = row[property],
						cell = column.cell || function(a) {return a},
						content;

						content = reduce([value].concat(cell), (v, fn) => {
							if(v && React.isValidElement(v.value)) {
								return v;
							}

							if(!isPlainObject(value) && isPlainObject(v)) {
								return merge(v, {
									value: fn(v.value, data, i, property)
								});
							}

							var val = fn(v, data, i, property);

							if(val && !isUndefined(val.value)) {
								return val;
							}

							// formatter shortcut
							return {
								value: val
							};
						});

						content = content || {};
						if (row.canEdit != true && (property == 'edit' || property == 'checkbox')) {
							content = {};
						}

						return (
							<Pod_tableCell key={j + '-cell'} column={column} index={j}>{content.value}</Pod_tableCell>
						)
					})
				}
			</div>
		);
	}

});

module.exports = Radium(Pod_tableRow);

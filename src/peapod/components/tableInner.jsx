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
var isFunction = lodash.isFunction;


var Pod_tableCell = require('./tableCell.jsx');

var Pod_tableInner = React.createClass({
	propTypes: {
		columnNames: React.PropTypes.oneOfType([
            React.PropTypes.object,
            React.PropTypes.func
        ]),
		data: React.PropTypes.array,
		columns: React.PropTypes.array,
		row: React.PropTypes.func,
		children: React.PropTypes.object,
		rowKey: React.PropTypes.string,
		hoveredRow: React.PropTypes.number
	},

	render: function() {
		var columnNames = this.props.columnNames;
		var data = this.props.data;
		var columns = this.props.columns;
		var rowKey = this.props.rowKey;
		var rowProps = this.props.row || function() {};
		var hoveredRow = this.props.hoveredRow;

		return (
			<div style={{overflowX: 'auto'}}>
				<div style={Pod_Styler.getStyle(this)}>
					{isFunction(columnNames) ? columnNames(columns) : <Pod_tableHeader config={columnNames} columns={columns} />}
					{
						data.map(function(row, i) {
							return (
								<div key={(row[rowKey] || i) + '-row'} {...rowProps(row, i)}
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
							)
						})
					}
				</div>
				{this.props.children}
			</div>
		);
	}
})

module.exports = Radium(Pod_tableInner);

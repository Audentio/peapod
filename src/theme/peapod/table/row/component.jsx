/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

 import React from 'react';
 import Pod_Styler from 'styler.js';

import {reduce as _reduce, isPlainObject as _isPlainObject, isUndefined as _isUndefined} from 'lodash'

import {Table_Cell} from 'components.js';

module.exports = class Table_Row extends React.Component {
	shouldComponentUpdate(nextProps, nextState) {
		//return true;
		return !lodash.isEqual(nextProps, this.props)
	}

	render() {
		var row = this.props.row,
			rowKey = this.props.rowKey,
			i = this.props.i,
			rowProps = this.props.rowProps,
			hoveredRow = this.props.hoveredRow,
			columns = this.props.columns,
			data = this.props.data,
			style = Pod_Styler.getStyle({}, {
				styleLike: 'Table_Inner',
				dark: i % 2 == 1,
				firstRow: i == 0,
				checked: row.checked == true,
				hovered: hoveredRow == i
			});

		return (
			<div {...rowProps(row, i)}
				style={style.row}
			>
				{
					columns.map(function(column, j) {
						var property = column.property,
						value = row[property],
						cell = column.cell || function(a) {return a},
						content;

						content = _reduce([value].concat(cell), (v, fn) => {
							if(v && React.isValidElement(v.value)) {
								return v;
							}

							if(!_isPlainObject(value) && _isPlainObject(v)) {
								return merge(v, {
									value: fn(v.value, data, i, property)
								});
							}

							var val = fn(v, data, i, property);

							if(val && !_isUndefined(val.value)) {
								return val;
							}

							// formatter shortcut
							return {
								value: val
							};
						});

						content = content || {};
						if (row.can_edit != true && (property == 'edit' || property == 'checkbox')) {
							content = {};
						}

						return (
							<Table_Cell key={j + '-cell'} column={column} index={j}>{content.value}</Table_Cell>
						)
					})
				}
			</div>
		);
	}

};

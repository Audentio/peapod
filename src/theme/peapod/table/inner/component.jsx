/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

 import React from 'react';
 import Pod_Styler from 'styler.js';
 import Wrapper from 'wrapper.jsx';


//var lodash = require('lodash')
//var isFunction = lodash.isFunction;

import {isFunction as _isFunction} from 'lodash'


var TableRow = require('./tableRow.jsx'); // TODO FIX THIS
var TableCell = require('./tableCell.jsx'); // TODO FIX THIS

var TableInner = React.createClass({
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

	shouldComponentUpdate: function(nextProps, nextState) {
		//return true;
		return !lodash.isEqual(nextProps, this.props)
	},

	render: function() {
		var style = Pod_Styler.getStyle(this);

		var columnNames = this.props.columnNames;
		var data = this.props.data;
		var columns = this.props.columns;
		var rowKey = this.props.rowKey;
		var rowProps = this.props.row || function() {};
		var hoveredRow = this.props.hoveredRow;

		return (
			<div style={{overflowX: 'auto'}}>
				<div style={style.main}>
					{isFunction(columnNames) ? columnNames(columns) : <TableHeader config={columnNames} columns={columns} />}
					{
						data.map(function(row, i) {
							return (
								<TableRow key={(row[rowKey] || i) + '-row'}
									row={row}
									rowKey={rowKey}
									i={i}
									rowProps={rowProps}
									hoveredRow={hoveredRow}
									columns={columns}
									data={data}
									/>
							)
						})
					}
				</div>
				{this.props.children}
			</div>
		);
	}
})

module.exports = Wrapper(TableInner);

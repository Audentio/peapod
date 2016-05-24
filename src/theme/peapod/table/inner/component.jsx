/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

 import React from 'react';
 import Pod_Styler from 'utility/styler.js';
 import PureRender from 'utility/pureRender.js';

//var lodash = require('lodash')
//var isFunction = lodash.isFunction;

import {isFunction as _isFunction, isEqual as _isEqual} from 'lodash'


import {Table_Row, Table_Header} from 'utility/components.js';


module.exports = class Table_Inner extends React.Component {

    //shouldComponentUpdate = PureRender;

	static propTypes = {
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
	}

	shouldComponentUpdate(nextProps, nextState) {
		//return true;
		return !_isEqual(nextProps, this.props)
	}

	render() {
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
					{_isFunction(columnNames) ? columnNames(columns) : <Table_Header config={columnNames} columns={columns} />}
					{
						data.map(function(row, i) {
							return (
								<Table_Row key={(row[rowKey] || i) + '-row'}
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
};

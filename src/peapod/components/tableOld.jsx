/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';
var Pod_Styler = require('../styler.jsx');
var TableRow = require('./tableRow.jsx');
var TableCell = require('./tableCell.jsx');
var Checkbox = require('./checkbox.jsx')

var cloneWithProps = require('react-addons-clone-with-props');



var Pod_table = React.createClass({

	getInitialState: function() {
		return {
			columnHovered: -1,
			tableData: this.props.tableData
		}
	},

	setColumnHovered: function(e) {
		var columnNum = -1;
		if (typeof(e.currentTarget) !== undefined) {
			var columnNum = e.currentTarget.getAttribute('data-table-column');
		}

		this.setState({columnHovered: columnNum})
	},

	setColumnHoveredNone: function() {
		this.setState({columnHovered: -1})
	},

	setCheckedRow: function(rowNum, state) {
		var newData = this.state.tableData;
		newData.data[rowNum].checked = state;
		this.setState({tableData: newData});
	},

	setRowChecks: function(state) {
		for (var i = 0, len = this.state.tableData.data.length; i < len; i++) {
			this.setCheckedRow(i, state);
		}
	},

	makeCell: function(data, column, i, rowNum, numColumns, header) {
		var heading = (header) ? column.heading : '',
			dataField = (!header) ? data[column.dataField] : '',
			content = (!header) ? column.content : '',
			mouseEnter = (header) ? this.setColumnHovered : '',
			mouseLeave = (header) ? this.setColumnHoveredNone : '';

		if (content !== '' && typeof(content) !== 'undefined') {
			var setCheckedRow = this.setCheckedRow;
			content = React.cloneElement(content, {
				checked: data.checked,
				onChange: function(state) {
					setCheckedRow(rowNum, state);
				},
				ref: 'table_' + rowNum + '_' + i // Kyler fix this
			});
		}

		return (
			<TableCell onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} key={i} styler={{
					header: header,
					column: i,
					firstCell: i == 0,
					lastCell: i == (numColumns - 1),
					columnHovered: this.state.columnHovered == i && column.sortable,
					centered: column.centered,
					borderlessHeader: this.props.styler.borderlessHeader
				}}>
				{heading}
				{dataField}
				{content}
			</TableCell>
		)
	},

	makeRow: function(data, rowNum, numRows) {
		var columns = [];
		for (var i = 0, len = this.state.tableData.columns.length; i < len ; i++) {
			var column = this.state.tableData.columns[i];
			columns.push(this.makeCell(data, column, i, rowNum, len, rowNum == -1));
		}

		return (
			<TableRow key={rowNum} styler={{
					header: rowNum == -1,
					dark: rowNum % 2 == 1,
					checked: data.checked,
					firstRow: rowNum == 0,
					lastRow: rowNum == (numRows - 1)
				}}>
				{columns}
			</TableRow>
		);
	},

	makeRows: function() {
		var rows = [];
		for (var i = 0, len = this.state.tableData.data.length; i < len; i++) {
			rows.push(this.makeRow(this.state.tableData.data[i], i, len));
		}

		return rows;
	},

	componentDidMount: function() {
		this.setRowChecks(true);
	},

	render: function() {
		var header = (this.props.header && this.props.tableData) ? this.makeRow([], -1) : '';
		var rows = (this.props.tableData) ? this.makeRows() : '';

		return (
			<div style={Pod_Styler.getStyle(this)}>
				{header}
				{rows}
				{this.props.children}
			</div>
		);
	}

});

module.exports = Radium(Pod_table);

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
var findIndex = require('lodash/array/findIndex');

var Button = require('./button.jsx')
var Checkbox = require('./checkbox.jsx')
var Icon = require('./icon.jsx')
var Paginator = require('./paginator.jsx')


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
			<div>
				<div style={Pod_Styler.getStyle(this)}>
					{isFunction(columnNames) ? columnNames(columns) : <Pod_tableColumnNames config={columnNames} columns={columns} />}
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

											return (
												<div key={j + '-cell'}
													style={Pod_Styler.getStyle({props: {
														styler: {
															styleLike: 'Pod_tableInner',
															firstCell: j == 0,
															centered: column.centered == true
														}
													}}, 'cell')}
												>
													{content.value}
												</div>
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

var Pod_tableControls = React.createClass({
	render: function() {
		return (
			<div style={Pod_Styler.getStyle(this)}>
				{this.props.children}
			</div>
		);
	}
})

var Pod_tableColumnNames = React.createClass({
	propTypes: {
		config: React.PropTypes.object,
		columns: React.PropTypes.array
	},

	render: function() {
		const config = this.props.config;
		const columns = this.props.columns;

		return (
			<div style={Pod_Styler.getStyle({props: {
				styler: {
					styleLike: 'Pod_tableInner',
					header: true
				}
			}}, 'row')}>
				{columns.map( function(column, i) {
					//apply any onEvent specidied to cell
					var columnHeader = reduce(config, function(result, v, k){
						result[k] = k.indexOf('on') === 0 ? v.bind(null, column) : v;
						return result;
					}, {});

					return (
						<div key={i + '-header'}
							style={Pod_Styler.getStyle({props: {
								styler: {
									styleLike: 'Pod_tableInner',
									header: true
								}
							}}, 'cell')}
						>
							{column.header}
						</div>
					)
				})
			}
			</div>
		)
	}
})

var Pod_table = React.createClass({
	getInitialState: function() {
		var data = this.props.data;

		return {
			data: data,
			hoveredRow: -1,
			search: {
				column: '',
				query: ''
			},
			header: {
				onClick: function(column) {
					console.log(column);
					sortColumn(
						this.state.columns,
						column,
						this.setState.bind(this)
					)
				}
			},
			sortingColumn: null,
			pagination: {
				page: 0,
				perPage: 30
			},
			columns: [
				{
					property: '',
					header: '',
					cell: function(value, celldata, rowIndex) {
						var idx = findIndex(this.state.data, {
							id: celldata[rowIndex].id
						})

						var edit = function(val) {
							if (typeof(val) !== 'undefined') {
								this.state.data[idx].checked = val;
								this.setState({
									data: this.state.data
								})
							}
						}
						return {
							value: (
								<Checkbox checked={this.state.data[idx].checked} onChange={edit.bind(this)}></Checkbox>
							)
						}
					}.bind(this),
					sortable: false,
					centered: true,
					hidden: '',
					fixed: ''
				}, {
					property: 'id',
					header: 'ID',
					cell: '',
					sortable: true,
					centered: false,
					hidden: '',
					fixed: ''
				}, {
					property: 'name',
					header: 'Username',
					cell: '',
					sortable: true,
					centered: false,
					hidden: '',
					fixed: ''
				}, {
					property: 'email',
					header: 'Email',
					cell: '',
					sortable: true,
					centered: false,
					hidden: '',
					fixed: ''
				}, {
					property: 'group',
					header: 'Group',
					cell: '',
					sortable: true,
					centered: false,
					hidden: '',
					fixed: ''
				}, {
					property: 'country',
					header: 'Country',
					cell: '',
					sortable: true,
					centered: false,
					hidden: '',
					fixed: ''
				}, {
					property: '',
					header: '',
					cell: function(value, celldata, rowIndex) {
						var idx = findIndex(this.state.data, {
							id: celldata[rowIndex].id
						})

						var edit = function() {
							alert('Write Edit Modal for id: ' + idx);
						}
						return {
							value: (
								<Icon onClick={edit.bind(this)}>settings</Icon>
							)
						}
					}.bind(this),
					sortable: false,
					centered: true,
					hidden: '',
					fixed: ''
				}
			]
		}
	},

	makeHeader: function() {
		var headerConfig = this.state.header;
		var columns = this.state.columns;
		// return if you don't want a header
		return (
			<Pod_tableColumnNames config={headerConfig} columns={columns} />
		)
	},

	checkAll: function(val) {
		var data = this.state.data;

		for (var i = 0, len = data.length; i < len; i++) {
			data[i].checked = val;
		}

		this.setState({
			data: data
		})

	},

	render: function() {
		var columns = this.state.columns,
			pagination = this.state.pagination,
			data = this.state.data,
			hoveredRow = this.state.hoveredRow;

		if (this.state.search.query) {
			// Kyler write this, reduce dataset based on query
		}

		// data = sortColumn.sort(data, this.state.sortingColumn, sortByOrder) // Kyler fix this for sortingColumn

		var paginated = Paginator.paginate(data, pagination); // Kyler, add in Paginator

		return (
			<div style={Pod_Styler.getStyle(this)}>
				<Pod_tableControls>
					<Checkbox styler={{
							style: {
								display: 'inline-block'
							}
						}}
						onChange={this.checkAll}></Checkbox>
					<Button styler={{
							kind: 'primary',
							round: true,
							style:{
								display: 'inline-block'
							}
					}}>All Users</Button>
					<Button styler={{
							kind: 'base',
							round: true,
							style:{
								display: 'inline-block'
							}
					}}>Active</Button>
					<Button styler={{
							kind: 'base',
							round: true,
							style:{
								display: 'inline-block'
							}
					}}>Banned</Button>
					Filter By
					<Icon>search</Icon>
				</Pod_tableControls>
				<Pod_tableInner style={Pod_Styler.getStyle(this)}
					data={paginated.data}
					columns={columns}
					columnNames={this.makeHeader}
					hoveredRow = {hoveredRow}
					row={function(d, rowIndex) {
						return {
							onMouseEnter: function(e) {
								this.setState({hoveredRow: rowIndex})
							}.bind(this),
							onMouseLeave: function() {
								this.setState({hoveredRow: -1})
							}.bind(this)
						}
					}.bind(this)}
					>
					<div style={Pod_Styler.getStyle(this, 'footer')}>
						Ban User Dropdown
						<Paginator
							page={paginated.page}
							pages={paginated.pages}
							perPage={paginated.perPage}
							total={paginated.total}
							onSelect={this.onSelect}
						/>
					</div>
				</Pod_tableInner>
			</div>
		);
	},

	onSelect: function(page) {
		console.log(page);
	}

});

module.exports = Radium(Pod_table);

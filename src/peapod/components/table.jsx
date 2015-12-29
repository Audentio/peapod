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
var sorter = lodash.sortByOrder;
var sortByOrder = require('lodash/collection/sortByOrder');

var Button = require('./button.jsx')
var Checkbox = require('./checkbox.jsx')
var Icon = require('./icon.jsx')
var Paginator = require('./paginator.jsx')
var Grid = require('./grid.jsx');
var Div = require('./div.jsx');


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
															centered: column.centered == true,
															hovered: column.hovered == true,
															sortable: column.sortable == true
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
					//apply any onEvent specified to cell
					var columnHeader = reduce(config, function(result, v, k){
						result[k] = k.indexOf('on') === 0 ? v.bind(null, column) : v;
						return result;
					}, {});

					var arrowStyler = {
						style: {
							fontSize: '$font.size.large',
							float: 'right',
							lineHeight: '$table.font.headerSize'
						}
					}

					return (
						<div key={i + '-header'} {...columnHeader}
							style={Pod_Styler.getStyle({props: {
								styler: {
									styleLike: 'Pod_tableInner',
									header: true,
									hovered: column.hovered == true,
									sortable: column.sortable == true,
									sortAsc: column.sort == 'asc',
									sortDesc: column.sort == 'desc'
								}
							}}, 'cell')}
						>
							{column.header}{column.sort == 'desc' ? <Icon styler={arrowStyler}>arrow_drop_down</Icon> : ''}{column.sort == 'asc' ? <Icon styler={arrowStyler}>arrow_drop_up</Icon> : ''}
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
					var columns = this.state.columns;
					for (var i = 0; i < columns.length; i++) {
						if (columns[i] == column) {
							if (columns[i].sort == '' || typeof(columns[i].sort) == 'undefined') {
								columns[i].sort = 'desc';
							} else if (columns[i].sort == 'desc') {
								columns[i].sort = 'asc';
							} else {
								columns[i].sort = '';
								column = null;
							}
						} else {
							columns[i].sort = '';
						}
					}

					this.setState({
						columns: columns,
						sortingColumn: column
					})
				}.bind(this),
				onMouseEnter: function(column) {
					var columns = this.state.columns,
						newColumn = column;

					newColumn.hovered = true;
					for (var i = 0; i < columns.length; i++) {
						if (columns[i] == column) {
							columns[i] = newColumn;
						}
					}

					this.setState({
						columns: columns
					})
				}.bind(this),
				onMouseLeave: function(column) {
					var columns = this.state.columns;
					for (var i = 0; i < columns.length; i++) {
						columns[i].hovered = false;
					}

					this.setState({
						columns: columns
					})
				}.bind(this)
			},
			sortingColumn: null,
			sortingOrder: 'asc',
			pagination: {
				page: 0,
				perPage: 20
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
								<Icon onClick={edit.bind(this)} styler={{
										style: {
											color: '$table.color.editIcon.color'
										}
									}}>settings</Icon>
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

	sortColumn: function(data, column, order) {
		if (!column) {
			return data;
		}

		var ascending = column.sort === 'asc' ? 'desc' : 'asc';

		return sortByOrder(data, [column.property], [ascending])
	},

	render: function() {
		var columns = this.state.columns,
			pagination = this.state.pagination,
			data = this.state.data,
			hoveredRow = this.state.hoveredRow,
			sortingColumn = this.state.sortingColumn || null;

		if (this.state.search.query) {
			//data = Search.search(data, columns, this.state.search.column, this.state.search.query)
		}

		data = this.sortColumn(data, sortingColumn, '')

		var paginated = Paginator.paginate(data, pagination); // subset current page's data

		var topButtonStyle = {
			display: 'inline-block',
			height: '2.5rem',
			lineHeight: '1.1rem',
			fontSize: '1.1rem',
			paddingLeft: '$gutter.small',
			paddingRight: '$gutter.small',
			margin: '$gutter.internal'
		}


		return (
			<div style={Pod_Styler.getStyle(this)}>
				<Pod_tableControls>
					<Grid styler={{justifyContent: 'space-between', style: {height: '$table.headerHeight', lineHeight: '$table.headerHeight'}}}>
						<div>
							<Div styler={{
									style: {
										display: 'inline-block',
										marginLeft: '$gutter.internal',
										marginRight: '$gutter.internal'
									}
								}}>
								<Checkbox styler={{
										varSet: 'dark'
									}}
									onChange={this.checkAll}></Checkbox>
							</Div>
							<Button styler={{
									kind: 'primary',
									round: true,
									style: topButtonStyle
							}}>All Users</Button>
							<Button styler={{
									kind: 'base',
									round: true,
									style: topButtonStyle
							}}>Active</Button>
							<Button styler={{
									kind: 'base',
									round: true,
									style: topButtonStyle
							}}>Banned</Button>
						</div>
						<div>
							<Div styler={{
									style: {
										display: 'inline-block',
										lineHeight: '$table.headerHeight',
										paddingLeft: '$gutter.internal',
										paddingRight: '$gutter.internal',
										height: '$table.headerHeight'
									}
								}}>Filter By</Div>

							<Div styler={{
									style: {
										display: 'inline-block',
										borderLeftWidth: '1px',
										borderLeftStyle: 'solid',
										borderLeftColor: '#778A9D',
										height: '$table.headerHeight',

									}
								}}>
								<Icon styler={{
										style: {
											height: '$table.headerHeight',
											fontSize: '$font.size.xxlarge',
											lineHeight: '$table.headerHeight',
											paddingLeft: '$gutter.small',
											paddingRight: '$gutter.small'
										}
									}}>
									search</Icon>
							</Div>
						</div>
					</Grid>
				</Pod_tableControls>
				<Pod_tableInner style={Pod_Styler.getStyle(this)}
					data={paginated.data}
					columns={columns}
					columnNames={this.makeHeader}
					hoveredRow = {hoveredRow}
					row={function(d, rowIndex) {
						return {
							onMouseEnter: function() {
								this.setState({hoveredRow: rowIndex})
							}.bind(this),
							onMouseLeave: function() {
								this.setState({hoveredRow: -1})
							}.bind(this)
						}
					}.bind(this)}
					>
					<div style={Pod_Styler.getStyle(this, 'footer')}>
						<Grid styler={{
								justifyContent: 'space-between',
								style: {height: '$table.footerHeight', lineHeight: '$table.footerHeight'}
							}}>
							<div>
								Ban User Dropdown
							</div>
							<Paginator
								page={paginated.page}
								pages={paginated.pages}
								perPage={paginated.perPage}
								total={paginated.total}
								clickPrevious={this.clickPrevious}
								clickNext={this.clickNext}
							/>
						</Grid>
					</div>
				</Pod_tableInner>
			</div>
		);
	},

	clickPrevious: function() {
		this.changePage(this.state.pagination.page - 1)
	},

	clickNext: function() {
		this.changePage(this.state.pagination.page + 1)
	},

	changePage: function(page) {
		if (page >= 0  && page < Math.ceil(this.state.data.length / this.state.pagination.perPage))
		this.setState({pagination: {
			page: page,
			perPage: this.state.pagination.perPage
		}});
	}

});

module.exports = Radium(Pod_table);

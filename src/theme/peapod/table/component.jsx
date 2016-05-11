/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React from 'react';
import Pod_Styler from 'styler.js';

var lodash = require('lodash') // TODO FIX THIS
var reduce = lodash.reduce;
var isPlainObject = lodash.isPlainObject;
var isUndefined = lodash.isUndefined;
var isFunction = lodash.isFunction;
var sorter = lodash.sortBy;

import {Button, Checkbox, Icon, Paginator, Grid, Div, Portal, Table_Query, Table_Inner, Table_Preset, Table_Control, Table_Header} from 'components.js';


module.exports = class Alert extends React.Component {

	constructor(props, context) {
		super(props, context);

		var data = props.data;
		var isFetching = props.isFetching;
		var columns = props.columns;
		var presets = props.presets;

		for (var i = 0, len = columns.length; i < len; i++) {
			if (isFunction(columns[i].cell)) columns[i].cell = columns[i].cell.bind(this); // bind cell functions
		}

		this.state = {
			data: lodash.values(data),
			isFetching: isFetching,
			hoveredRow: -1,
			search: [/*
				{
					column: 'country',
					comparison: 'contains',
					value: 'a'
				},
				{
					column: 'id',
					comparison: '<',
					value: '80'
				}
			*/],
			header: {
				onClick: function(column) {
					var columns = this.state.columns;
					if (column.sortable) {
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
					}
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
				perPage: 30
			},
			columns: columns,
			presets: presets
		}
	}

	componentWillReceiveProps(nextProps) {
		var data = lodash.values(nextProps.data);

		this.setState({data: data})
	}

	makeHeader() {
		var headerConfig = this.state.header;
		var columns = this.state.columns;
		// return if you don't want a header
		return (
			<Table_Header config={headerConfig} columns={columns} />
		)
	}

	checkAll(val) {
		var data = this.state.data;

		if (typeof(data) !== 'undefined') {
			for (var i = 0, len = data.length; i < len; i++) {
				if (data[i].visible && data[i].can_edit == true) data[i].checked = val;
			}

			this.setState({
				data: data
			})
		}
	}

	sortColumn(data, column, order) {
		if (!column) {
			return data;
		}

		var ascending = column.sort === 'asc' ? 'desc' : 'asc';

		if (ascending == 'desc') {
			return lodash.reverse(sorter(data, [column.property]));
		}
		return sorter(data, [column.property]);
	}

	filterData(data, query) {
		var filtered = [];
		if (typeof(data) !== 'undefined') {
			for (var i = 0, len = data.length; i < len; i++) {
				if (typeof(data[i]) !== 'undefined' && typeof(data[i][query.column]) !== 'undefined' && data[i][query.column] !== null) {
					if (query.comparison == '<') {
						if (data[i][query.column] < query.value) {
							filtered.push(data[i])
						}
					} else if (query.comparison == '<=') {
						if (data[i][query.column] <= query.value) {
							filtered.push(data[i])
						}
					} else if (query.comparison == '>') {
						if (data[i][query.column] > query.value) {
							filtered.push(data[i])
						}
					} else if (query.comparison == '>=') {
						if (data[i][query.column] >= query.value) {
							filtered.push(data[i])
						}
					} else if (query.comparison == '!=') {
						if (data[i][query.column] != query.value) {
							filtered.push(data[i])
						}
					} else if (query.comparison == '==') {
						if (data[i][query.column] == query.value) {
							filtered.push(data[i])
						}
					} else if (query.comparison == 'contains') {
						if (data[i][query.column].indexOf(query.value) > -1) {
							filtered.push(data[i])
						}
					}
				}
			}
		}
		return filtered;
	}

	search(data, columns, queries) {
		var filtered = data;
		for (var i = 0, len = queries.length; i < len; i++) {
			filtered = this.filterData(filtered, queries[i]);
		}
		return filtered;
	}

	getTableData() {
		var columns = this.state.columns,
			data = this.state.data,
			pagination = this.state.pagination,
			sortingColumn = this.state.sortingColumn || null,
			queries = this.state.search;

		if (queries.length) {
			data = this.search(data, columns, queries)
		}

		data = this.sortColumn(data, sortingColumn, '')

		var newState = this.state.data;

		if (typeof(newState) !== 'undefined') {
			for (var i = 0, len = this.state.data.length; i < len; i++) {
				var found = false;
				for (var j = 0, len2 = data.length; j < len2; j++) {
					if (this.state.data[i] == data[j]) {
						found = true;
						break;
					}
				}
				if (found) {
					newState[i].visible = true;
				} else {
					newState[i].visible = false;
				}
			}
		}

		if (newState != this.state.data) this.setState({
			data: newState
		})

		return Paginator.paginate(data, pagination); // subset current page's data
	}

	addQueryOnePerColumn(column, comparison, value, display) {
		var newQueries = [],
			queries = this.state.search,
			newQuery = {
				column: column,
				comparison: comparison,
				value: value,
				display: display !== false
			};

		for (var i = 0, len = queries.length; i < len; i++) {
			if (queries[i].column !== column) newQueries.push(queries[i])
		}

		newQueries.push(newQuery)
		this.setState({search: newQueries});
	}

	addQuery(column, comparison, value, display) {
		var search = this.state.search,
			queryExists = false,
			newQuery = {
				column: column,
				comparison: comparison,
				value: value,
				display: display !== false
			};

		for (var i = 0, len = search.length; i < len; i++) {
			if (search[i].column == newQuery.column && search[i].comparison == newQuery.comparison && search[i].value == newQuery.value) queryExists = true;
		}

		if (!queryExists) { // don't add the same query multiple times
			search.push(newQuery)
			this.setState({search: search});
		}
	}

	removeColumnQuery(column) {
		var newQueries = [],
			queries = this.state.search;

		for (var i = 0, len = queries.length; i < len; i++) {
			if (queries[i].column !== column) newQueries.push(queries[i])
		}

		this.setState({search: newQueries});
	}

	removeQuery(index) {
		var newQueries = [],
			queries = this.state.search;

		for (var i = 0, len = queries.length; i < len; i++) {
			if (i !== index) newQueries.push(queries[i])
		}

		this.setState({search: newQueries});
	}

	render() {
		var style = Pod_Styler.getStyle(this);

		var columns = this.state.columns,
			pagination = this.state.pagination,
			hoveredRow = this.state.hoveredRow,
			queries = this.state.search;

		var paginated = this.getTableData();

		var userActionsTrigger = <span>User Actions</span>;


		var statusStyle = Pod_Styler.getStyle({props: {
			styler: {
				styleLike: 'Table_Cell',
				style: {
					borderLeft: 'none',
					borderRight: 'none',
					borderTop: 'none',
					borderBottom: 'none',
					display: 'block',
					fontSize: '$table.font.size'
				}
			}}});
		var isFetching = (this.props.isFetching) ? <div style={statusStyle}>Loading Data...</div>: null;
		var noData = (paginated.data.length == 0 && !this.props.isFetching) ? <div style={statusStyle}>No Data</div>: null;
		var presets = (typeof(this.state.presets) !== 'undefined') ? <Table_Preset queries={queries} addQuery={this.addQuery} removeQuery={this.removeColumnQuery} addQueryOnePerColumn={this.addQueryOnePerColumn} presets={this.state.presets}/> : null;

		return (
			<div style={style.main}>
				<Table_Control>
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
									onChange={this.checkAll.bind(this)}></Checkbox>
							</Div>
							{presets}
						</div>
						<Grid>
							<Table_Query queries={queries} removeQuery={this.removeQuery}/>

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
						</Grid>
					</Grid>
				</Table_Control>
				<Table_Inner style={style.main}
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
						<div>
							{noData}
							{isFetching}
						</div>
				</Table_Inner>
				<div style={style.footer}>
					<Grid styler={{
							justifyContent: 'space-between',
							style: {height: '$table.footerHeight', lineHeight: '$table.footerHeight'}
						}}>

						<Div styler={{style:{marginLeft: '$gutter.small',}}}>
							<Button styler={{
									kind: 'base',
									style: {
										fontSize: '$font.size.xsmall',
										height: '2.5rem',
										lineHeight: '2.5rem',

									}
								}}>
								<Portal closeOnEsc closeOnOutsideClick trigger={userActionsTrigger}>
									<div style={{backgroundColor: '#CCC'}}>
										<span>Pseudo Modal</span>
										<Button styler={{style:{display: 'block'}}}>Yep</Button>
									</div>
								</Portal>
								</Button>
						</Div>
						<Paginator
							page={paginated.page}
							pages={paginated.pages}
							perPage={paginated.perPage}
							total={paginated.total}
							clickPrevious={this.clickPrevious.bind(this)}
							clickNext={this.clickNext.bind(this)}
							styler={{
								onePage: paginated.pages == 1 && paginated.page == 0
							}}
						/>
					</Grid>
				</div>

			</div>
		);
	}

	clickPrevious() {
		this.changePage(this.state.pagination.page - 1)
	}

	clickNext() {
		this.changePage(this.state.pagination.page + 1)
	}

	changePage(page) {
		if (page >= 0  && page < (this.getTableData().total / this.state.pagination.perPage))
		this.setState({pagination: {
			page: page,
			perPage: this.state.pagination.perPage
		}});
	}

};

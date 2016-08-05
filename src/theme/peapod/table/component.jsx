/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React from 'react';
import Pod_Styler from 'utility/styler.js';
// import PureRender from 'utility/pureRender.js';

import { isFunction, sortBy as _sorter, values as _values, reverse as _reverse, merge as _merge } from 'lodash';

import {
    Button,
    Checkbox,
    Icon,
    Paginator,
    Grid,
    // Card,
    Div,
    Portal,
    Table_Query as TableQuery,
    Table_Inner as TableInner,
    Table_Preset as TablePreset,
    Table_Control as TableControl,
    Table_Header as TableHeader,
} from 'utility/components.js';


module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    // shouldComponentUpdate = PureRender;
    constructor(props, context) {
        super(props, context);

        const data = props.data;
        const isFetching = props.isFetching;
        const columns = props.columns;
        const presets = props.presets;

        for (let i = 0; i < columns.length; i++) {
            if (isFunction(columns[i].cell)) columns[i].cell = columns[i].cell.bind(this); // bind cell functions
        }

        this.state = {
            data: _values(data),
            isFetching,
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
                */
            ],
            header: {
                onClick: (column) => {
                    if (column.sortable) {
                        for (let i = 0; i < columns.length; i++) {
                            if (columns[i] === column) {
                                if (columns[i].sort === '' || typeof(columns[i].sort) === 'undefined') {
                                    columns[i].sort = 'desc';
                                } else if (columns[i].sort === 'desc') {
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
                            columns,
                            sortingColumn: column,
                        });
                    }
                },
                onMouseEnter: (column) => {
                    const newColumn = column;

                    newColumn.hovered = true;
                    for (let i = 0; i < columns.length; i++) {
                        if (columns[i] === column) {
                            columns[i] = newColumn;
                        }
                    }

                    this.setState({ columns });
                },
                onMouseLeave: () => {
                    // const columns = this.state.columns;
                    for (let i = 0; i < columns.length; i++) {
                        columns[i].hovered = false;
                    }

                    this.setState({ columns });
                },
            },
            sortingColumn: null,
            sortingOrder: 'asc',
            pagination: {
                page: 0,
                perPage: 30,
            },
            columns,
            presets,
        };
    }

    // @kylerc please look these over and specify correct proptypes
    static propTypes = {
        data: React.PropTypes.any,
        isFetching: React.PropTypes.any,
        columns: React.PropTypes.any,
        presets: React.PropTypes.any,
        styler: React.PropTypes.object,
        hasHeader: React.PropTypes.bool,
        noControls: React.PropTypes.bool,
        noFooter: React.PropTypes.bool,
    }
    static defaultProps = {
        hasHeader: true,
    }

    componentWillReceiveProps(nextProps) {
        const data = _values(nextProps.data);

        this.setState({ data });
    }

    makeHeader = () => {
        const headerConfig = this.state.header;
        const columns = this.state.columns;
        // return if you don't want a header
        const header = (this.props.hasHeader) ? <TableHeader config={headerConfig} columns={columns} /> : '';
        return header;
    }

    hasCheckbox = () => {
        if (this.state.data === undefined) return false;

        for (let i = 0, len = this.state.data.length; i < len; i++) {
            if (this.state.data[i].can_edit) {
                return true;
                // break; // return breaks it
            }
        }

        return false;
    }

    checkAll = (val) => {
        const data = this.state.data;

        if (typeof(data) !== 'undefined') {
            for (let i = 0; i < data.length; i++) {
                if (data[i].visible && data[i].can_edit === true) data[i].checked = val;
            }

            this.setState({ data });

            this.forceUpdate();
        }
    }

    sortColumn = (data, column) => {
        if (!column) {
            return data;
        }

        const ascending = column.sort === 'asc' ? 'desc' : 'asc';

        if (ascending === 'desc') {
            return _reverse(_sorter(data, [column.property]));
        }
        return _sorter(data, [column.property]);
    }

    filterData = (data, query) => {
        const filtered = [];
        if (typeof(data) !== 'undefined') {
            for (let i = 0, len = data.length; i < len; i++) {
                if (typeof(data[i]) !== 'undefined' && typeof(data[i][query.column]) !== 'undefined' && data[i][query.column] !== null) {
                    if (query.comparison === '<') {
                        if (data[i][query.column] < query.value) {
                            filtered.push(data[i]);
                        }
                    } else if (query.comparison === '<=') {
                        if (data[i][query.column] <= query.value) {
                            filtered.push(data[i]);
                        }
                    } else if (query.comparison === '>') {
                        if (data[i][query.column] > query.value) {
                            filtered.push(data[i]);
                        }
                    } else if (query.comparison === '>=') {
                        if (data[i][query.column] >= query.value) {
                            filtered.push(data[i]);
                        }
                    } else if (query.comparison === '!=') {
                        if (data[i][query.column] !== query.value) {
                            filtered.push(data[i]);
                        }
                    } else if (query.comparison === '==') {
                        if (data[i][query.column] === query.value) {
                            filtered.push(data[i]);
                        }
                    } else if (query.comparison === 'contains') {
                        if (data[i][query.column].indexOf(query.value) > -1) {
                            filtered.push(data[i]);
                        }
                    }
                }
            }
        }
        return filtered;
    }

    search = (data, columns, queries) => {
        let filtered = data;
        for (let i = 0, len = queries.length; i < len; i++) {
            filtered = this.filterData(filtered, queries[i]);
        }
        return filtered;
    }

    getTableData = () => {
        const columns = this.state.columns;
        const pagination = this.state.pagination;
        const sortingColumn = this.state.sortingColumn || null;
        const queries = this.state.search;

        let data = this.state.data;

        if (queries.length) {
            data = this.search(data, columns, queries);
        }

        data = this.sortColumn(data, sortingColumn, '');

        const newState = this.state.data;

        if (typeof(newState) !== 'undefined') {
            for (let i = 0, len = this.state.data.length; i < len; i++) {
                let found = false;
                for (let j = 0, len2 = data.length; j < len2; j++) {
                    if (this.state.data[i] === data[j]) {
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

        if (newState !== this.state.data) this.setState({ data: newState });

        return Paginator.paginate(data, pagination); // subset current page's data
    }

    addQueryOnePerColumn = (column, comparison, value, display) => {
        const newQueries = [];
        const queries = this.state.search;
        const newQuery = {
            column,
            comparison,
            value,
            display: display !== false,
        };

        for (let i = 0, len = queries.length; i < len; i++) {
            if (queries[i].column !== column) newQueries.push(queries[i]);
        }

        newQueries.push(newQuery);
        this.setState({ search: newQueries });
    }

    addQuery = (column, comparison, value, display) => {
        const search = this.state.search;
        const newQuery = {
            column,
            comparison,
            value,
            display: display !== false,
        };
        let queryExists = false;

        for (let i = 0, len = search.length; i < len; i++) {
            if (search[i].column === newQuery.column && search[i].comparison === newQuery.comparison && search[i].value === newQuery.value) queryExists = true;
        }

        if (!queryExists) { // don't add the same query multiple times
            search.push(newQuery);
            this.setState({ search });
        }
    }

    removeColumnQuery = (column) => {
        const newQueries = [];
        const queries = this.state.search;

        for (let i = 0, len = queries.length; i < len; i++) {
            if (queries[i].column !== column) newQueries.push(queries[i]);
        }

        this.setState({ search: newQueries });
    }

    removeQuery = (index) => {
        const newQueries = [];
        const queries = this.state.search;

        for (let i = 0, len = queries.length; i < len; i++) {
            if (i !== index) newQueries.push(queries[i]);
        }

        this.setState({ search: newQueries });
    }

    render() {
        const classes = Pod_Styler.getClassStyle(this);

        const columns = this.state.columns;
        const hoveredRow = this.state.hoveredRow;
        const queries = this.state.search;
        const paginated = this.getTableData();
        const userActionsTrigger = <span>User Actions</span>;

        const statusClasses = Pod_Styler.getClassStyle({ props: {
            styler: {
                styleLike: 'Table_Cell',
                style: {
                    borderLeft: 'none',
                    borderRight: 'none',
                    borderTop: 'none',
                    borderBottom: 'none',
                    display: 'block',
                    fontSize: '$table.font.size',
                },
            },
        } });

        const isFetching = (this.props.isFetching) ? <div className={statusClasses.main}>Loading Data...</div> : null;
        const noData = (paginated.data.length === 0 && !this.props.isFetching) ? <div style={statusClasses.main}>No Data</div> : null;
        const presets = (typeof(this.state.presets) !== 'undefined') ? <TablePreset queries={queries} addQuery={this.addQuery} removeQuery={this.removeColumnQuery} addQueryOnePerColumn={this.addQueryOnePerColumn} presets={this.state.presets} /> : null;

        // only show checkAll when there is one
        const checkAll_box = (this.hasCheckbox()) ?
            <Checkbox
                styler={{
                    varSet: 'dark',
                }}
                onChange={this.checkAll}
            />
            :
            null;

        const tableControls = (this.props.noControls) ? '' : (
            <TableControl>
                <Grid styler={{ justifyContent: 'space-between', style: { height: '$table.headerHeight', lineHeight: '$table.headerHeight' } }}>
                    <div>
                        <Div
                            styler={{
                                style: {
                                    display: 'inline-block',
                                    marginLeft: '$gutter.internal',
                                    marginRight: '$gutter.internal',
                                },
                            }}
                        >
                            {checkAll_box}
                        </Div>
                        {presets}
                    </div>
                    <Grid>
                        <TableQuery queries={queries} removeQuery={this.removeQuery} />

                        <Icon
                            styler={{
                                style: {
                                    height: '$table.headerHeight',
                                    fontSize: '$font.size.xxlarge',
                                    lineHeight: '$table.headerHeight',
                                    paddingLeft: '10px',
                                    paddingRight: '14px',
                                },
                            }}
                        >
                            more_vert
                        </Icon>
                    </Grid>
                </Grid>
            </TableControl>
        );

        const tableFooter = (this.props.noFooter) ? '' : (
            <div className={classes.footer}>
                <Grid
                    styler={{
                        justifyContent: 'space-between',
                        style: { height: '$table.footerHeight', lineHeight: '$table.footerHeight' },
                    }}
                >

                    <Div styler={{ style: { marginLeft: '$gutter.small' } }}>
                        <Button
                            styler={{
                                kind: 'base',
                                dense: true,
                                style: {
                                    // fontSize: '$font.size.xsmall',
                                    // height: '2.5rem',
                                    // lineHeight: '2.5rem',

                                },
                            }}
                        >
                            <Portal closeOnEsc closeOnOutsideClick trigger={userActionsTrigger}>
                                <div style={{ backgroundColor: '#CCC' }}>
                                    <span>Pseudo Modal</span>
                                    <Button styler={{ style: { display: 'block' } }}>Yep</Button>
                                </div>
                            </Portal>
                        </Button>
                    </Div>
                    <Paginator
                        page={paginated.page}
                        pages={paginated.pages}
                        perPage={paginated.perPage}
                        total={paginated.total}
                        clickPrevious={this.clickPrevious}
                        clickNext={this.clickNext}
                        styler={{
                            onePage: paginated.pages === 1 && paginated.page === 0,
                        }}
                    />
                </Grid>
            </div>
        );

        return (
            <div styler={_merge({ style: classes.style.main }, this.props.styler)}>
                {tableControls}
                <TableInner
                    className={classes.main}
                    data={paginated.data}
                    columns={columns}
                    columnNames={this.makeHeader}
                    hoveredRow={hoveredRow}
                    row={
                        (d, rowIndex) => ({
                            onMouseEnter: () => this.setState({ hoveredRow: rowIndex }),
                            onMouseLeave: () => this.setState({ hoveredRow: -1 }),
                        })
                    }
                >
                    <div>
                        {noData}
                        {isFetching}
                    </div>
                </TableInner>
                {tableFooter}

            </div>
        );
    }

    clickPrevious = () => {
        this.changePage(this.state.pagination.page - 1);
    }

    clickNext = () => {
        this.changePage(this.state.pagination.page + 1);
    }

    changePage = (page) => {
        if (page >= 0 && page < (this.getTableData().total / this.state.pagination.perPage)) {
            this.setState({
                pagination: {
                    page,
                    perPage: this.state.pagination.perPage,
                },
            });
        }
    }

};

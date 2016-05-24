/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React from 'react';
import Pod_Styler from 'utility/styler.js';
import PureRender from 'utility/pureRender.js';

import { isFunction as _isFunction, isEqual as _isEqual } from 'lodash';


import { Table_Row, Table_Header } from 'utility/components.js';


module.exports = function (componentName) {
    return class Pod_Component extends React.Component {

        static displayName = componentName;

        //shouldComponentUpdate = PureRender;

        static propTypes = {
            columnNames: React.PropTypes.oneOfType([
                React.PropTypes.object,
                React.PropTypes.func,
            ]),
            data: React.PropTypes.array,
            columns: React.PropTypes.array,
            row: React.PropTypes.func,
            children: React.PropTypes.object,
            rowKey: React.PropTypes.string,
            hoveredRow: React.PropTypes.number,
        }

        shouldComponentUpdate(nextProps) {
            return !_isEqual(nextProps, this.props);
        }

        render() {
            const style = Pod_Styler.getStyle(this);

            const columnNames = this.props.columnNames;
            const data = this.props.data;
            const columns = this.props.columns;
            const rowKey = this.props.rowKey;
            const rowProps = this.props.row || function () {};
            const hoveredRow = this.props.hoveredRow;

            return (
                <div style={{ overflowX: 'auto' }}>
                    <div style={style.main}>
                        {_isFunction(columnNames) ? columnNames(columns) : <Table_Header config={columnNames} columns={columns} />}
                        {
                            data.map(
                                (row, i) => {
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
                                    );
                                }
                            )
                        }
                    </div>
                    {this.props.children}
                </div>
            );
        }
    };
};

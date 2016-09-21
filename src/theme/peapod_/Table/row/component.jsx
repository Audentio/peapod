/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React from 'react';
import Styler from 'utility/styler.js';

import { merge as _merge, reduce as _reduce, isPlainObject as _isPlainObject, isUndefined as _isUndefined } from 'lodash';

import { Table_Cell } from 'utility/components.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    static propTypes = {
        // TODO: Check these
        children: React.PropTypes.any,
        row: React.PropTypes.any,
        i: React.PropTypes.any,
        rowProps: React.PropTypes.any,
        hoveredRow: React.PropTypes.any,
        columns: React.PropTypes.any,
        data: React.PropTypes.any,
    }

    // shouldComponentUpdate = PureRender;
    parseBooleans(content) {
        for (const item in content) {
            if (item === 'value') {
                if (content[item] === true) content[item] = 'true';
                else if (content[item] === false) content[item] = 'false';
            }
        }
    }

    render() {
        const row = this.props.row;
        // const rowKey = this.props.rowKey;
        const i = this.props.i;
        const rowProps = this.props.rowProps;
        const hoveredRow = this.props.hoveredRow;
        const columns = this.props.columns;
        const data = this.props.data;
        const classes = Styler.getClasses({}, {
            styleLike: 'Table_Inner',
            dark: i % 2 === 1,
            firstRow: i === 0,
            checked: row.checked === true,
            hovered: hoveredRow === i,
        });
        const _this = this;

        return (
            <div
                {...rowProps(row, i)}
                className={classes.row}
            >
                {
                    columns.map(
                        (column, j) => {
                            const property = column.property;
                            const value = row[property];
                            const cell = column.cell || function (a) { return a; };
                            let content;

                            content = _reduce([value].concat(cell), (v, fn) => {
                                if (v && React.isValidElement(v.value)) {
                                    return v;
                                }

                                if (!_isPlainObject(value) && _isPlainObject(v)) {
                                    return _merge(v, {
                                        value: fn(v.value, data, i, property),
                                    });
                                }

                                const val = fn(v, data, i, property);

                                if (val && !_isUndefined(val.value)) {
                                    return val;
                                }

                                // formatter shortcut
                                return {
                                    value: val,
                                };
                            });

                            content = content || {};
                            if (row.can_edit !== true && (property === 'edit' || property === 'checkbox')) {
                                content = {};
                            }

                            _this.parseBooleans(content);

                            return (
                                <Table_Cell key={j + '-cell'} column={column} index={j}>{content.value}</Table_Cell>
                            );
                        }
                    )
                }
            </div>
        );
    }
};

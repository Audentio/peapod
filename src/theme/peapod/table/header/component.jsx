/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React from 'react';
import Pod_Styler from 'utility/styler.js';
// import PureRender from 'utility/pureRender.js';

import { reduce as _reduce } from 'lodash';
import { Icon, Table_Cell } from 'utility/components.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    // shouldComponentUpdate = PureRender;

    static propTypes = {
        config: React.PropTypes.object,
        columns: React.PropTypes.array,
    }

    render() {
        const style = Pod_Styler.getStyle({ props: {
            styler: {
                styleLike: 'Table_Inner',
                header: true,
            },
        } });

        const config = this.props.config;
        const columns = this.props.columns;

        return (
            <div style={style.row}>
                {columns.map(
                    (column, i) => {
                        // apply any onEvent specified to cell
                        const columnHeader = _reduce(config, (result, v, k) => {
                            result[k] = k.indexOf('on') === 0 ? v.bind(null, column) : v;
                            return result;
                        }, {});

                        const arrowStyle = {
                            style: {
                                fontSize: '$font.size.large',
                                position: 'relative',
                                top: -1,
                                verticalAlign: 'middle',
                                marginLeft: 5,
                            },
                        };

                        return (
                            <Table_Cell
                                key={i + '-header'}
                                column={column}
                                header
                                {...columnHeader}
                                styler={{ style: { borderTopWidth: '1px' } }}
                            >
                                {column.header}
                                {column.sort === 'desc' ? <Icon styler={arrowStyle}>arrow_downward</Icon> : ''}
                                {column.sort === 'asc' ? <Icon styler={arrowStyle}>arrow_upward</Icon> : ''}
                            </Table_Cell>
                        );
                    })
                }
            </div>
        );
    }
};

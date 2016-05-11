/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

 import React from 'react';
 import Pod_Styler from 'styler.js';

//var lodash = require('lodash')
//var reduce = lodash.reduce;
import {reduce as _reduce} from 'lodash'

import {Icon, Table_Cell} from 'components.js';

module.exports = class Table_Header extends React.Component {
	static propTypes = {
		config: React.PropTypes.object,
		columns: React.PropTypes.array
	}

	render() {
		var style = Pod_Styler.getStyle({props: {
			styler: {
				styleLike: 'Table_Inner',
				header: true
			}
		}});

		const config = this.props.config;
		const columns = this.props.columns;

		return (
			<div style={style.row}>
				{columns.map( function(column, i) {
					//apply any onEvent specified to cell
					var columnHeader = _reduce(config, function(result, v, k){
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
						<Table_Cell key={i + '-header'} column={column} header={true} {...columnHeader}>
							{column.header}{column.sort == 'desc' ? <Icon styler={arrowStyler}>arrow_drop_down</Icon> : ''}{column.sort == 'asc' ? <Icon styler={arrowStyler}>arrow_drop_up</Icon> : ''}
						</Table_Cell>
					)
				})
			}
			</div>
		)
	}
};

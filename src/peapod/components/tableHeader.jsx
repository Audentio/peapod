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

var Pod_tableCell = require('./tableCell.jsx');

var Icon = require('./icon.jsx')

var Pod_tableHeader = React.createClass({
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
						<Pod_tableCell key={i + '-header'} column={column} header={true} {...columnHeader}>
							{column.header}{column.sort == 'desc' ? <Icon styler={arrowStyler}>arrow_drop_down</Icon> : ''}{column.sort == 'asc' ? <Icon styler={arrowStyler}>arrow_drop_up</Icon> : ''}
						</Pod_tableCell>
					)
				})
			}
			</div>
		)
	}
})

module.exports = Radium(Pod_tableHeader);

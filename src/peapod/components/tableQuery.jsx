/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';
var Pod_Styler = require('../styler.jsx');

var Button = require('./button.jsx')
var Icon = require('./icon.jsx')
var Grid = require('./grid.jsx');
var Div = require('./div.jsx');

var topButtonStyle = {
	display: 'inline-block',
	height: '2.5rem',
	lineHeight: '1.1rem',
	fontSize: '1.1rem',
	paddingLeft: '$gutter.small',
	paddingRight: '$gutter.small',
	margin: '$gutter.internal'
}

var Pod_tableQuery = React.createClass({
	render: function() {
		var queries = this.props.queries || [],
			removeQuery = this.props.removeQuery || function() {};

		var buttons = queries.map(function(query, i) {
			if (query.display == false) return '';

			return (
				<div key={'tableQuery_' + query.column + '_' + query.value} style={{display: 'inline-block'}}>
					{(i > 0) ? 'and' : ''}
					<Button styler={{
							kind: 'base',
							round: true,
							style: topButtonStyle
						}}>
							<Grid>
								<div>'{query.column}' {query.comparison} '{query.value}'</div>
								<Icon onClick={removeQuery.bind(null, i)} styler={{
									style: {
										color: '$color.text.white',
										marginLeft: '$gutter.internal'
									}
								}}>close</Icon>
							</Grid>
						</Button>
				</div>
			)
		})

		return (
			<Div styler={{style: {display: 'inline-block'}}}>
				Filter By {buttons}
			</Div>
		)
	}
})

module.exports = Radium(Pod_tableQuery);

/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

 import React from 'react';
 import Pod_Styler from 'styler.js';
 import Wrapper from 'wrapper.jsx';

import {Button, Icon, Grid, Div, Portal} from 'components.js';


var topButtonStyle = {
	height: '2.5rem',
	lineHeight: '1.1rem',
	fontSize: '1.1rem',
	paddingLeft: '$gutter.small',
	paddingRight: '$gutter.small',
	margin: '$gutter.internal'
}

var Table_Query = React.createClass({
	render: function() {
		var style = Pod_Styler.getStyle(this);

		var queries = this.props.queries || [],
			removeQuery = this.props.removeQuery || function() {},
			noQueries = (queries.length == 0) ? <div>No Queries</div> : null;

		var content = queries.map(function(query, i) {
			if (query.display == false) return '';

			return (
				<Div key={'tableQuery_' + query.column + '_' + query.value} styler={{
						style: {
							display: 'block',
							borderBottomColor: '$table.color.controls.color',
							borderBottomWidth: '1px',
							borderBottomStyle: 'solid'
						}
					}}>
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
				</Div>
			)
		})

		return (
			<Div styler={{style: {display: 'inline-block'}}}>
				<Portal closeOnOutsideClick trigger={<div>Filter By</div>}>
					<Div styler={{
							style: {
								backgroundColor: '$table.color.controls.background',
								borderTopColor: '$table.color.controls.color',
								borderTopWidth: '1px',
								borderTopStyle: 'solid'
							}
						}}>
						{content}
						{noQueries}
					</Div>
				</Portal>
			</Div>
		)
	}
})

module.exports = Wrapper(Table_Query);

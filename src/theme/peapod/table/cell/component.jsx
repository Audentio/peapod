/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

import React from 'react';
import Pod_Styler from 'styler.js';

module.exports = class Table_Cell extends React.Component {

	shouldComponentUpdate(nextProps, nextState) {
		return true;
		//return !lodash.isEqual(nextProps, this.props)
	}

	render() {
		var column = this.props.column || {
				centered: false,
				hovered: false,
				sort: '',
				header: false
			},
			index = this.props.index,
			style = Pod_Styler.getStyle({props: {
				styler: {
					styleLike: 'Table_Cell',
					firstCell: index == 0,
					centered: column.centered == true,
					hovered: column.hovered == true,
					sortable: column.sortable == true,
					sortAsc: column.sort == 'asc',
					sortDesc: column.sort == 'desc',
					sortAsc: column.sort == 'asc',
					sortDesc: column.sort == 'desc',
					header: this.props.header == true
				}
			}});

		return (
			<div {...this.props} style={style.main}>
				{this.props.children}
			</div>
		)
	}
};

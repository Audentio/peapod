import React from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';

var Pod_Styler = require('../styler.jsx');
var Pod_Vars = require('../vars.jsx');

var Icon = require('./icon.jsx');
var Grid = require('./grid.jsx');
var Div = require('./div.jsx');

function paginate(data, o) {
    data = data || [];

    var page = o.page || 0;
    var perPage = o.perPage;

    var amountOfPages = Math.ceil(data.length / perPage);
    var startPage = page < amountOfPages? page: 0;

    return {
        amount: amountOfPages,
		total: data.length,
        data: data.slice(startPage * perPage, startPage * perPage + perPage),
        page: startPage,
		perPage: perPage
    };
}

var Pod_paginator = React.createClass({

	render: function() {
		var page = this.props.page,
			pages = this.props.pages,
			perPage = this.props.perPage,
			total = this.props.total,
			lastItem = ((page + 1) * perPage) > total ? total : (page + 1) * perPage,
			nextTrigger = this.props.nextTrigger || <Icon>chevron_right</Icon>,
			previousTrigger = this.props.previousTrigger || <Icon>chevron_left</Icon>;

		return (
			<div style={Pod_Styler.getStyle(this)}>
				<Grid>
					<div style={Pod_Styler.getStyle(this, 'label')}>
						{page * perPage + 1}-{lastItem} of {total}
					</div>
					<div onClick={this.props.clickPrevious} style={Pod_Styler.getStyle(this, 'trigger')}>
						{previousTrigger}
					</div>
					<div onClick={this.props.clickNext} style={Pod_Styler.getStyle(this, 'trigger')}>
						{nextTrigger}
					</div>
				</Grid>
			</div>
		)
	}
})

Pod_paginator.paginate = paginate;

module.exports = Pod_paginator;

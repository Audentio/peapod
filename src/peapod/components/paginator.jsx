import React from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';

var Pod_Styler = require('../styler.jsx');
var Pod_Vars = require('../vars.jsx');

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
			lastItem = ((page + 1) * perPage) > total ? total : (page + 1) * perPage;

		return (
			<div>
				{page * perPage + 1} - {lastItem} of {total}
				<div>
					Previous Page
				</div>
				<div>
					Next Page
				</div>
			</div>
		)
	}
})

Pod_paginator.paginate = paginate;

module.exports = Pod_paginator;

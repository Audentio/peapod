import React from 'react';
import ReactDOM from 'react-dom';

var Pod_Styler = require('../styler.js');
var Wrapper = require('../wrapper.jsx')


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
		total: data.length,
        data: data.slice(startPage * perPage, startPage * perPage + perPage),
        page: startPage,
		pages: amountOfPages,
		perPage: perPage
    };
}

var Paginator = React.createClass({

	render: function() {
		var style = Pod_Styler.getStyle(this);

		var page = this.props.page,
			pages = this.props.pages,
			perPage = this.props.perPage,
			total = this.props.total,
			firstItem = (total == 0) ? 0 : page * perPage + 1,
			lastItem = ((page + 1) * perPage) > total ? total : (page + 1) * perPage,
			nextTrigger = this.props.nextTrigger || <Icon>chevron_right</Icon>,
			previousTrigger = this.props.previousTrigger || <Icon>chevron_left</Icon>,
			previous = page > 0 ? (<div key='previous' onClick={this.props.clickPrevious} style={style.trigger}>
					{previousTrigger}
				</div>) : '',
			next = pages > page + 1 ? (<div key='next' onClick={this.props.clickNext} style={style.trigger}>
				{nextTrigger}
			</div>) : '';

		return (
			<div style={style.main}>
				<Grid>
					<div style={style.label}>
						{firstItem}-{lastItem} of {total}
					</div>
					{previous}
					{next}
				</Grid>
			</div>
		)
	}
})

Paginator.paginate = paginate;

module.exports = Wrapper(Paginator);

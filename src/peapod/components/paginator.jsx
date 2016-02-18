import React from 'react';
import ReactDOM from 'react-dom';

var Pod_Styler = require('../styler.jsx');
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
		var page = this.props.page,
			pages = this.props.pages,
			perPage = this.props.perPage,
			total = this.props.total,
			firstItem = (total == 0) ? 0 : page * perPage + 1,
			lastItem = ((page + 1) * perPage) > total ? total : (page + 1) * perPage,
			nextTrigger = this.props.nextTrigger || <Icon>chevron_right</Icon>,
			previousTrigger = this.props.previousTrigger || <Icon>chevron_left</Icon>,
			previous = page > 0 ? (<div key='previous' onClick={this.props.clickPrevious} style={Pod_Styler.getStyle(this, 'trigger')}>
					{previousTrigger}
				</div>) : '',
			next = pages > page + 1 ? (<div key='next' onClick={this.props.clickNext} style={Pod_Styler.getStyle(this, 'trigger')}>
				{nextTrigger}
			</div>) : '';

		return (
			<div style={Pod_Styler.getStyle(this)}>
				<Grid>
					<div style={Pod_Styler.getStyle(this, 'label')}>
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
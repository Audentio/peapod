import React from 'react';
import Styler from 'utility/styler.js';

import { Icon, Grid } from 'utility/components.js';

const Paginator = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    render() {
        const classes = Styler.getClassStyle(this);

        const page = this.props.page;
        const pages = this.props.pages;
        const perPage = this.props.perPage;
        const total = this.props.total;
        const firstItem = (total == 0) ? 0 : page * perPage + 1;
        const lastItem = ((page + 1) * perPage) > total ? total : (page + 1) * perPage;
        const nextTrigger = this.props.nextTrigger || <Icon>chevron_right</Icon>;
        const previousTrigger = this.props.previousTrigger || <Icon>chevron_left</Icon>;
        const previous = page > 0 ? (<div key="previous" onClick={this.props.clickPrevious} className={classes.trigger}>
            {previousTrigger}
        </div>) : '';
        const next = pages > page + 1 ? (<div key="next" onClick={this.props.clickNext} className={classes.trigger}>
            {nextTrigger}
        </div>) : '';

        return (
            <div className={classes.main}>
                <Grid>
                    <div className={classes.label}>
                        {firstItem}-{lastItem} of {total}
                    </div>
                    {previous}
                    {next}
                </Grid>
            </div>
        );
    }
};

Paginator.__proto__.paginate = (data, o) => {
    data = data || [];

    const page = o.page || 0;
    const perPage = o.perPage;

    const amountOfPages = Math.ceil(data.length / perPage);
    const startPage = page < amountOfPages ? page : 0;

    return {
        total: data.length,
        data: data.slice(startPage * perPage, startPage * perPage + perPage),
        page: startPage,
        pages: amountOfPages,
        perPage,
    };
};

module.exports = Paginator;

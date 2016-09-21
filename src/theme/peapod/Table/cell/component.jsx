/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React from 'react';
import Styler from 'utility/styler.js';
import PureRender from 'utility/pureRender.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    static propTypes = {
        column: React.PropTypes.any,
        index: React.PropTypes.number,
        header: React.PropTypes.bool,
        children: React.PropTypes.any,
    }

    shouldComponentUpdate = PureRender;

    render() {
        const column = this.props.column || {
            centered: false,
            hovered: false,
            sort: '',
            header: false,
        };
        const index = this.props.index;
        const classes = Styler.getClasses({ props: {
            styler: {
                styleLike: 'Table_Cell',
                firstCell: index === 0,
                centered: column.centered === true,
                hovered: column.hovered === true,
                sortable: column.sortable === true,
                sortAsc: column.sort === 'asc',
                sortDesc: column.sort === 'desc',
                header: this.props.header === true,
            },
        } });

        return (
            <div {...this.props} className={classes.main}>
                {this.props.children}
            </div>
        );
    }
};

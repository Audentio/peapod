/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

import React, { PropTypes, Component } from 'react';
import Styler from 'utility/styler.js';
import { Card, Menu_Item } from 'utility/components.js';
// import Logger from 'utility/logger.js';

module.exports = componentName => class Pod_Component extends Component {

    constructor(props, context) {
        super(props, context);
    }

    static displayName = componentName;

    static propTypes = {
        children: PropTypes.any,
        json: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object,
        ]),
        propMap: PropTypes.object,
        filter: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.func,
        ]),
        render: PropTypes.string,
    }

    filterByProps(items, filter) {
        const { find, in: filterProps } = filter;

        const filteredItems = items.filter(child => {
            // Props to filter from
            for (let x = 0; x < filterProps.length; x++) {
                const prop = filterProps[x];
                const re = new RegExp(find, 'i');
                const match = (child.props[prop] && typeof child.props[prop] === 'string') ? child.props[prop].search(re) : -1;

                // Match found. Return & break loop
                if (match >= 0) return true;
            }
            return false;
        });

        return filteredItems;
    }

    // Create react element collection from JSON Array
    mapJSONtoItems(json) {
        const { propMap } = this.props;
        const itemprops = {};
        let index = 0;

        return json.map(item => {
            index++;
            for (const prop in item) {
                if (propMap.hasOwnProperty(prop)) {
                    itemprops[propMap[prop]] = item[prop];
                } else {
                    itemprops[prop] = item[prop];
                }
            }
            return <Menu_Item key={`Menu_Item_${index}`} {...itemprops} />;
        });
    }

    filterItems(filter) {
        const { items } = this.state;

        switch (typeof filter) {
        case 'object':
            return this.filterByProps(items, filter);

        case 'function':
            return items.filter(filter, filter);

        default:
            return items;
        }
    }

    reloadList(props) {
        const { children, json, filter } = props;

        this.state.items = json ? this.mapJSONtoItems(json) : children;
        this.state.list = this.filterItems(filter);
    }

    componentWillMount() {
        this.reloadList(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.reloadList(nextProps);
    }

    render() {
        const style = Styler.getStyle(this);

        return (
            <Card styler={{ style: { width: 200, marginLeft: 0 } }}>
                <ul style={style.main}>
                    {this.state.list}
                </ul>
            </Card>
        );
    }
};

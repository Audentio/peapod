/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React, { PropTypes } from 'react';
import Pod_Helper from 'utility/helper.js';
import Styler from 'utility/styler.js';


/**
* Icon component
*
* @element Pod_icon
* @param {string} animation - pre-defined animation
* @param {string} color - Icon color
* @param {string} label - Icon label (for tooltip and ARIA)
*/
module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    static propTypes = {
        children: PropTypes.string.isRequired,
        animation: PropTypes.string,
        label: PropTypes.string,
        color: PropTypes.string,
        onClick: PropTypes.func,
        style: PropTypes.object,
        styler: PropTypes.object,
    }


    static defaultProps = {
        size: '1rem',
        color: 'inherit',
    }

    componentWillMount() {
        Pod_Helper.addStylesheet('IconFont_MDI', '//fonts.googleapis.com/icon?family=Material+Icons');
    }

    render() {
        const classes = Styler.getClassStyle(this);
        // const mergedStyle = Object.assign({}, style.main, this.props.style);
        const { label, children } = this.props;

        return (
            <i {...this.props} className={`material-icons ${classes.main}`} aria-label={label} title={label}>
                {children}
            </i>
        );
    }
};

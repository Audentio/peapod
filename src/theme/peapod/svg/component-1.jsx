/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

// Dependencies
import React from 'react';
import Styler from 'utility/styler.js';

function pascalize(str) {
    return str.split('-').map(function (name) {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }).join('');
}

function attrsToProps(attrs) {
    var obj = {};
    for (var i = 0; i < attrs.length; ++i) {
        obj[attrs[i].nodeName] = attrs[i].value;
    }
    return obj;
}

function toReact(node, components) {
    if (node.nodeType === 1) {
        var children = [].map.call(node.childNodes, function (child) {
            return toReact(child, components);
        });
        return React.createElement(components[pascalize(node.nodeName)],
                                    attrsToProps(node.attributes),
                                    children);
    } else if (node.nodeType === 3) {
        return (node.nodeValue + '').trim();
    }
    return '';
}

function xmlToReactComponents(xmlDom, components) {
    if (xmlDom && xmlDom.documentElement) {
        return React.createElement('div', [], [].map.call(xmlDom.documentElement.childNodes, function (child) {
            return toReact(child, components);
        }));
    }
}

module.exports = componentName => class Pod_Component extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            file: undefined,
        };
    }

    static displayName = componentName;

    // Validate props
    static propTypes = {

    }

    // Default props
    static defaultProps = {

    }

    componentDidMount() {
        Pod_Helper.xhr({
            url: this.props.file,
            success: (response) => {
                const file = response;
                this.setState({ file });
            },
        });
    }

    render() {
        const classes = Styler.getClassStyle(this);

        const parser = new DOMParser();
        const doc = parser.parseFromString(this.state.file, 'image/svg+xml');
        const T = React.createElement(doc, {}, 'Title');

        return (
            <div className={classes.main}>
                {T}
            </div>
        );
    }
};

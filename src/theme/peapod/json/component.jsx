/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


// Dependencies
import React from 'react';
import Styler from 'utility/styler.js';
import Pod from 'utility/components.js';

/**
* Json component
* @element Code
*/
module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    static propTypes = {
        json: React.PropTypes.object,
    }

    static defaultProps = {
        json: {},
    }

    parse(json) {
        const objs = [];
        for (let index in json) {
            if (json[index]) {
                const Component = Pod[index];
                const children = json[index].children;
                const toParse = json[index].JsonParse;

                if (toParse) {
                    for (let i = 0; i < toParse.length; i++) {
                        json[index][toParse[i]] = this.parse(json[index][toParse[i]]);
                    }

                    delete json[index].JsonParse;
                }

                if (typeof children === 'object') {
                    json[index].children = this.parse(children);
                } else {
                    json[index].children = children;
                }

                objs.push(<Component key={index} {...json[index]} />);
            }
        }

        return objs;
    }

    componentWillMount() {
        this.parse = this.parse.bind(this);

        this.setState({
            components: this.parse(this.props.json),
        });
    }

    render() {
        const classes = Styler.getClassStyle(this);
        let components;

        if (this.state.components.length > 1) {
            components = (
                <div className={classes.main}>
                    {this.state.components}
                </div>
            );
        } else {
            components = this.state.components[0];
        }

        return components;
    }
};

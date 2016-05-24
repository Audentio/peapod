/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


// Dependencies
import React from 'react';
import Pod_Styler from 'utility/styler.js';
import Pod from 'utility/components.js';

/**
* Json component
* @element Code
*/
module.exports = function (componentName) {
    return class Pod_Component extends React.Component {

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
                const Component = Pod[index];
                let children = json[index].children;
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

            return objs;
        }

        componentWillMount() {
            this.parse = this.parse.bind(this);

            this.setState({
                components: this.parse(this.props.json),
            });
        }

        render() {
            const style = Pod_Styler.getStyle(this);
            let components;

            if (this.state.components.length > 1) {
                components = (
                    <div style={style.main}>
                        {this.state.components}
                    </div>
                );
            } else {
                components = this.state.components[0];
            }

            return components;
        }
    };
};

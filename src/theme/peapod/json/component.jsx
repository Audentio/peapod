/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


// Dependencies
import React from 'react';
import Pod_Styler from 'styler.js';
import Pod from 'components.js';

/**
* Json component
* @element Code
*/
module.exports = class Json extends React.Component {

    static propTypes = {
        json: React.PropTypes.object,
    }

    static defaultProps = {
        json: {},
    }

    componentWillMount() {
        const json = this.props.json;
        const objs = [];
        for (let index in json) {
            const Component = Pod[index];
            objs.push(<Component key={index} {...json[index]} />);
        }

        this.setState({
            components: objs,
        });
    }

    render() {
        const style = Pod_Styler.getStyle(this);

        return (
            <div style={style.main}>
                {this.state.components}
            </div>
        );
    }
};

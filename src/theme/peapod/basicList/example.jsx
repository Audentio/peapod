import React, { Component, PropTypes } from 'react';
import { ContentWrap, Input, BasicList } from 'utility/components.js';
// import dummyData from './dummyData.js';

class BasicListFilterExample extends Component {

    static propTypes = {
        filter: PropTypes.object,
        type: PropTypes.string,
    }

    constructor(props, context) {
        super(props, context);

        this.state = {
            filter: { find: '', in: ['children', 'code', 'friends'] },
        };
    }

    change = input => {
        const find = input.value;
        this.setState({
            filter: { find, in: this.state.filter.in },
        });
    }

    render() {
        return (
            <div>
                <Input
                    type="text"
                    placeholder={this.props.type === 'people' ? 'People & their friends...' : 'Search country...'}
                    onChange={this.change}
                />
                <BasicList
                    filter={this.state.filter}
                    json={{}}
                    render="menu"
                    propMap={{
                        name: 'children',
                    }}
                />
            </div>
        );
    }
}

module.exports = class BasicListExample extends React.Component {

    render() {
        return (
            <ContentWrap>
                <BasicListFilterExample type="countries" />
            </ContentWrap>
        );
    }

};

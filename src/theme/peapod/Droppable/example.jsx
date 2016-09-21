import React from 'react';
import { ContentWrap, Droppable } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class DroppableExample extends React.Component {

	shouldComponentUpdate = PureRender;
    constructor() {
        super();
        this.state = {
            dropped: false,
        };

        this.onDrop = this.onDrop.bind(this);
    }

    onDrop() {
        this.setState({ dropped: true });
    }

    render() {
        const dropped = (this.state.dropped) ? 'You did it wrong!' : 'Drop Something here.';

        return (
            <div>
                <ContentWrap>
                    <Droppable onDrop={this.onDrop}>{dropped}</Droppable>
                </ContentWrap>
            </div>
        );
    }

}

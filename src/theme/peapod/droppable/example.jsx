import React from 'react';
import Pod from 'components.js';

module.exports = class DroppableExample extends React.Component {
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
                <Pod.ContentWrap>
                    <Pod.Droppable onDrop={this.onDrop}>{dropped}</Pod.Droppable>
                </Pod.ContentWrap>
            </div>
        );
    }

}

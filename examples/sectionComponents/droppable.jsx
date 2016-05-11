import React from 'react'
import Pod from 'components.js'

export default class DroppableSection extends React.Component {
    constructor() {
        super();
        this.state = {
            dropped: false
        }

        this.onDrop = this.onDrop.bind(this);
    }

    onDrop() {
        this.setState({dropped:true})
    }

    render () {
        var dropped = (this.state.dropped) ? 'You did it wrong!' : 'Drop Something here.';

        return (
            <div key={'droppable'}>
                <Pod.Section>
                    <Pod.ContentWrap>
                        <Pod.Droppable onDrop={this.onDrop}>{dropped}</Pod.Droppable>
                    </Pod.ContentWrap>
                </Pod.Section>
            </div>
        )
    }

}

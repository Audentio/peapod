import React from 'react'
import ReactDOM from 'react-dom'
import 'components'
import Paragraph from 'components/paragraph'
import Strong from 'components/strong'
import Code from 'components/code'

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
                <Pod.section>
                    <Pod.contentWrap>
                        <Pod.droppable onDrop={this.onDrop}>{dropped}</Pod.droppable>
                    </Pod.contentWrap>
                </Pod.section>
            </div>
        )
    }

}
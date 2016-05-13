import React from 'react'
import ReactDOM from 'react-dom'
import 'components'
import Paragraph from 'components/paragraph'
import Strong from 'components/strong'
import Code from 'components/code'

export default class DamionDev extends React.Component {
// ugly but gives me more room to write :)

constructor() {
    super();

    this.state = {
        dragged:false
    }

    this.droppableChildren = []

    this.onDrop = this.onDrop.bind(this)
    this.onDragStart = this.onDragStart.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
}

onDragStart(e) {
    var elem = ReactDOM.findDOMNode(this.refs.draggableElem);
    this.droppableChildren.push(elem)
    // this.refs.droppableElem.appendChild(elem)
    this.setState({
        dragged: e.target
    });

    // alert("apples")
}
onDragEnd(e) {
    this.setState({
        dragged:false
    })
}

onDrop (e) {
    console.log(this.state)
    this.state.dragged.remove()
    this.setState({
        dragged:false
    })
}

render () {
return(
    <div key={'dev'}>
        <Pod.section>
            <Pod.contentWrap>
                <Pod.heading styler={{secondary: true}}>Development Enviroment</Pod.heading>
            </Pod.contentWrap>
        </Pod.section>

        <Pod.section>
            <Pod.contentWrap>
                <Pod.draggable ref="draggableElem" onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
                    Drag Me Please
                </Pod.draggable>

                <Pod.droppable onDrop={this.onDrop}  ref="droppableElem">
                    Drop On Me {this.droppableChildren}
                </Pod.droppable>
            </Pod.contentWrap>
        </Pod.section>
    </div>
)}}
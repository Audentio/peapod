/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

//Dependencies
import React from 'react';
import Pod_Styler from 'styler.js';

/**
* Droppable component
* @element Code
*/
module.exports = class Droppable extends React.Component {

    static defaultProps = {
    	droppable: true,
    	multiple: true
    }

    componentWillMount() {
        this.onDragStart = this.onDragStart.bind(this)
        this.onDragEnter = this.onDragEnter.bind(this)
        this.onDrop = this.onDrop.bind(this)
        this.onDragOver = this.onDragOver.bind(this)
        this.onDragLeave = this.onDragLeave.bind(this)
    	this.onDragEnd = this.onDragEnd.bind(this)
    }

    onDragStart(event){
        event.preventDefault();

        if (typeof this.props.onDragStart == 'function')
            this.props.onDragStart(event)
    }
    onDragEnter(event){
        event.preventDefault();

        if (typeof this.props.onDragEnter == 'function')
            this.props.onDragEnter(event)
    }
    onDrop(event){
        event.preventDefault();

        if (typeof this.props.onDrop == 'function')
            this.props.onDrop(event)
    }
    onDragOver(event){
        event.preventDefault();

        if (typeof this.props.onDragOver == 'function')
            this.props.onDragOver(event)
    }
    onDragLeave(event){
        event.preventDefault();

        if (typeof this.props.onDragLeave == 'function')
            this.props.onDragLeave(event)
    }
    onDragEnd(event){
        event.preventDefault();

        if (typeof this.props.onDragEnd == 'function')
            this.props.onDragEnd(event)
    }

    render() {
        var style = Pod_Styler.getStyle(this);

        return (
        	<div
                style={style.main}

                onDragStart={this.onDragStart}
                onDragEnter={this.onDragEnter}
                onDrop={this.onDrop}
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onDragEnd={this.onDragEnd}
            >
                {this.props.children}
            </div>
        );

    }

};

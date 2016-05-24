/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

// Dependencies
import React from 'react';
import Pod_Styler from 'utility/styler.js';

/**
* Droppable component
* @element Code
*/
module.exports = class Droppable extends React.Component {

    static propTypes = {
        droppable: React.PropTypes.bool,
        multiple: React.PropTypes.bool,
        window: React.PropTypes.bool,

        onDragStart: React.PropTypes.func,
        onDragEnter: React.PropTypes.func,
        onDrop: React.PropTypes.func,
        onDragOver: React.PropTypes.func,
        onDragLeave: React.PropTypes.func,
        onDragEnd: React.PropTypes.func,

        children: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.object,
        ]),
    }

    static defaultProps = {
        droppable: true,
        multiple: true,
        window: false,
    }

    componentWillMount() {
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);

        if (this.props.window) {
            window.addEventListener('dragover', this.onDragEnter);
            window.addEventListener('dragenter', this.onDragEnter);

            window.addEventListener('drop', this.onDrop);
        }
    }

    onDragStart(event) {
        event.preventDefault();

        if (typeof this.props.onDragStart === 'function') {
            this.props.onDragStart(event);
        }
    }

    onDragEnter(event) {
        event.dataTransfer.dropEffect = 'copy';
        event.preventDefault();

        if (typeof this.props.onDragEnter === 'function') {
            this.props.onDragEnter(event);
        }
    }
    onDrop(event) {
        event.preventDefault();

        if (typeof this.props.onDrop === 'function') {
            this.props.onDrop(event);
        }
    }

    onDragOver(event) {
        event.dataTransfer.dropEffect = 'copy';
        event.preventDefault();

        if (typeof this.props.onDragOver === 'function') {
            this.props.onDragOver(event);
        }
    }

    onDragLeave(event) {
        event.preventDefault();

        if (typeof this.props.onDragLeave === 'function') {
            this.props.onDragLeave(event);
        }
    }

    onDragEnd(event) {
        event.preventDefault();

        if (typeof this.props.onDragEnd === 'function') {
            this.props.onDragEnd(event);
        }
    }

    render() {
        const style = Pod_Styler.getStyle(this);

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

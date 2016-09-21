/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

// Dependencies
import React from 'react';
import Styler from 'utility/styler.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    constructor(props, context) {
        super(props, context);

        this.state = {
            _podPaneWidth: -1,
        };
    }

    static childContextTypes = {
        _podPaneWidth: React.PropTypes.number,
    }

    static propTypes = {
        children: React.PropTypes.any,
        styler: React.PropTypes.object,
    }

    getChildContext() {
        return {
            _podPaneWidth: this.state._podPaneWidth,
        };
    }

    /*
    componentDidMount() {
        // initial check
        this.widthCheck();
        // start listening for viewport events
        if (typeof(window.Pod_Panes) === 'undefined') {
            window.Pod_Panes = {
                items: {},
                count: 0,
                add(getter, setter) {
                    const item = {
                        get: getter,
                        set: setter,
                        width: -1,
                    };

                    this.items[this.count] = item;
                    this.count += 1;
                },

                remove(index) {
                    delete this.items[index];
                },

                getAll() {
                    for (let i = 0, len = Object.keys(this.items).length; i < len; i++) {
                        this.items[i].width = this.items[i].get();
                    }
                },

                setAll() {
                    for (let i = 0, len = Object.keys(this.items).length; i < len; i++) {
                        this.items[i].set(this.items[i].width);
                    }
                },

                updateAll() {
                    for (let i = 0, len = Object.keys(this.items).length; i < len; i++) {
                        this.items[i].set(this.items[i].get());
                    }
                },
            };

            window.addEventListener('resize', this.updateAll);

            document.addEventListener('DOMContentLoaded', this.updateAll);
        }

        this.paneIndex = window.Pod_Panes.add(this.widthGet.bind(this), this.widthSet.bind(this));
    }

    componentWillUnmount() {
        window.Pod_Panes.remove(this.paneIndex);

        window.removeEventListener('resize', window.Pod_Panes.updateAll);
        window.removeEventListener('DOMContentLoaded', window.Pod_Panes.updateAll);
    }

    widthGet() {
        const element = this.refs.pane;
        if (typeof(element) !== 'undefined') {
            // return window.innerWidth; // testing performance without element queries
            return element.offsetWidth;
        }
        return -1;
    }

    widthSet(width) {
        if (width !== this.state._podPaneWidth) {
            this.setState({ _podPaneWidth: width });
        }
    }

    widthCheck() {
        this.widthSet(this.widthGet());
    }
    */

    render() {
        const { styler, children, ...other } = this.props; // eslint-disable-line no-unused-vars
        const classes = Styler.getClasses(this);

        return (
            <div {...other} className={classes.main} ref="pane">
                {this.props.children}
            </div>
        );
    }
};

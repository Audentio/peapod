/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

// Dependencies
import React from 'react';
import Pod_Styler from 'utility/styler.js';

module.exports = function (componentName) {
    return class Pod_Component extends React.Component {

        static displayName = componentName;  constructor(props, context) {
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

                        window.Pod_Panes.items[window.Pod_Panes.count] = item;
                        window.Pod_Panes.count += 1;
                    },

                    remove(index) {
                        delete window.Pod_Panes.items[index];
                    },

                    getAll() {
                        for (let i = 0, len = Object.keys(window.Pod_Panes.items).length; i < len; i++) {
                            window.Pod_Panes.items[i].width = window.Pod_Panes.items[i].get();
                        }
                    },

                    setAll() {
                        for (let i = 0, len = Object.keys(window.Pod_Panes.items).length; i < len; i++) {
                            window.Pod_Panes.items[i].set(window.Pod_Panes.items[i].width);
                        }
                    },

                    updateAll() {
                        for (let i = 0, len = Object.keys(window.Pod_Panes.items).length; i < len; i++) {
                            window.Pod_Panes.items[i].set(window.Pod_Panes.items[i].get());
                        }
                    },
                };

                window.addEventListener('resize', window.Pod_Panes.updateAll);

                document.addEventListener('DOMContentLoaded', window.Pod_Panes.updateAll);
            }

            this.paneIndex = window.Pod_Panes.add(this.widthGet.bind(this), this.widthSet.bind(this));
        }

        componentWillUnmount() {
            window.Pod_Panes.remove(this.paneIndex);
        }

        widthGet() {
            const element = this.refs.pane;
            if (typeof(element) !== 'undefined') {
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

        render() {
            const { styler, children, ...other } = this.props; // eslint-disable-line no-unused-vars
            const style = Pod_Styler.getStyle(this);

            return (
                <div {...other} style={style.main} ref="pane">
                    {this.props.children}
                </div>
            );
        }
    };
};

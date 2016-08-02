/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React from 'react';
import Pod_Styler from 'utility/styler.js';
import { Icon } from 'utility/components.js';

/**
* Alerts component
*
* @element Pod_alert
* @param {boolean} [dismissable=true] - Allow user to dismiss alert
* @param {string} [ID] - Unique identifier for persistent state storage
*
*/
module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    constructor(props, context) {
        super(props, context);

        this.state = {
            dismissed: this.isDismissed(),
        };
    }

    static propTypes = {
        dismissable: React.PropTypes.bool,
        id: React.PropTypes.string,
        children: React.PropTypes.any,
    }

    static defaultProps = {
        dismissable: true,
        styler: {
            kind: 'general',
        },
    }

    // Check if user dismissed the alert already
    isDismissed = () => {
        const persistentState = localStorage[`Pod_alert_${this.props.id}_hidden`];
        if (this.props.dismissable && persistentState && persistentState === 'true') {
            return true;
        }

        return false;
    }

    // @function dismiss()
    // onDismiss handler
    dismiss = () => {
        // set state
        this.setState({
            dismissed: true,
        });

        if (this.props.dismissable) {
            if (this.props.id === undefined) {
                console.warn('Pod_Alert: ID not supplied for dismissable alert. State will not be persistent'); // eslint-disable-line no-console
                return false;
            }

            // set persistent state (localStorage)
            localStorage[`Pod_alert_${this.props.id}_hidden`] = true;
        }
        return true;
    }


    render() {
        const style = Pod_Styler.getStyle(this);

        return (
            <div style={style.main} id={this.props.id}>
                {
                    !this.state.dismissed &&

                        <div style={style.wrapper}>
                            {this.props.dismissable &&
                                <Icon onClick={this.dismiss} styler={{ style: style.dismissIcon }} color="#07ADD4">close</Icon>
                            }
                            <span style={style.message}>
                                {this.props.children}
                            </span>
                        </div>
                }
            </div>
        );
    }


};

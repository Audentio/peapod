/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React, { PropTypes } from 'react';
import Pod_Styler from 'utility/styler.js';
// import { Icon } from 'utility/components.js';
import Logger from 'utility/logger.js';


/**
* Notifications component
*
* @element Pod_notification
* @param {boolean} [dismissable=true] - Allow user to dismiss the notification
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
        dismissable: PropTypes.bool,
        id: PropTypes.string,
        title: PropTypes.string,
        children: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element,
            PropTypes.node,
        ]),
        full: PropTypes.bool,
        multiline: PropTypes.bool,
    }

    static defaultProps = {
        styler: {
            kind: 'general',
        },
    }

    // Check if user dismissed the notification already
    isDismissed = () => {
        const { id, dismissable } = this.props;
        const persistentState = localStorage[`Pod_notification_${id}_hidden`];

        if (dismissable && persistentState && persistentState === 'true') {
            return true;
        }

        return false;
    }

    dismiss = () => {
        this.setState({ dismissed: true });

        // set persistent state (localStorage)
        localStorage[`Pod_notification_${this.props.id}_hidden`] = true;
    }

    componentWillMount() {
        if (this.props.dismissable && this.props.id === undefined) {
            Logger.warn('Pod_notification: ID not supplied for dismissable notification. State will not be persistent');
            Logger.trace();
            return;
        }
    }

    render() {
        const style = Pod_Styler.getStyle(this);

        const dismiss = (<div style={style.dismissIcon}>
            <div onClick={this.dismiss}>{this.props.dismissable && 'Dismiss'}</div>
        </div>);

        const topIcon = (!this.props.full) ? dismiss : '';
        const bottomIcon = (this.props.full) ? dismiss : '';

        return (
            <div style={style.main} id={this.props.id}>
                {!this.state.dismissed &&

                    <div style={style.wrapper}>
                        {topIcon}

                        {this.props.title && <strong style={style.title}>{this.props.title}</strong>}

                        <span style={style.message}>
                            {this.props.children}
                        </span>
                        {bottomIcon}
                    </div>
                }
            </div>
        );
    }

};

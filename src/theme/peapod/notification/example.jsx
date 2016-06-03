import React from 'react';
import Pod from 'utility/components.js';
import PureRender from 'utility/pureRender.js';


module.exports = class NotificationExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        const restoreNotifs = function () {
            window.location.reload();
        };

        return (
            <div>
                <Pod.ContentWrap>
                    <p><Pod.Button onClick={restoreNotifs} label="Restore all notifications" /></p>

                    {/* <Pod.Notification dismissable id="notif_base">Hello there!</Pod.Notification>*/}

                    <Pod.Notification
                        dismissable
                        title="Long notification!"
                        styler={{ style: { bottom: '16px' } }}
                        id="notif_danger"
                    >
                    </Pod.Notification>

                    <Pod.Notification
                        dismissable
                        title="Twelve ziggurats quickly jumped a finch box Twelve."
                        styler={{ style: { bottom: '80px' } }}
                        id="notif_info"
                        multiline
                    >
                    </Pod.Notification>

                    <Pod.Notification
                        dismissable
                        title="Twelve ziggurats quickly jumped a finch box Twelve ziggurats quickly."
                        styler={{ style: { bottom: '176px' } }}
                        id="notif_info"
                        multiline full
                    >
                    </Pod.Notification>

                    {/* <Pod.Notification
                        dismissable
                        title="Long notification!"
                        styler={{ kind: 'warning' }}
                        id="notif_warning"
                        >
                        Twelve ziggurats quickly jumped a finch box Twelve ziggurats quickly jumped a finch box Twelve ziggurats quickly jumped a finch box
                        </Pod.Notification>

                        <Pod.Notification
                        dismissable
                        title="Long notification!"
                        styler={{ kind: 'success' }}
                        id="notif_success"
                        >
                        Twelve ziggurats quickly jumped a finch box Twelve ziggurats quikly jumped a finch box Twelve ziggurats quickly jumped a finch box
                    </Pod.Notification>*/}
                </Pod.ContentWrap>
            </div>
        );
    }
};

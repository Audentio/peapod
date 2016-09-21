import React from 'react';
import { ContentWrap, Button, Notification } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';


module.exports = class NotificationExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        const restoreNotifs = function () {
            window.location.reload();
        };

        return (
            <div>
                <ContentWrap>
                    <p><Button onClick={restoreNotifs} label="Restore all notifications" /></p>

                    {/* <Notification dismissable id="notif_base">Hello there!</Notification>*/}

                    <Notification
                        dismissable
                        title="Long notification!"
                        styler={{ style: { bottom: '16px' } }}
                        id="notif_danger"
                    >
                    </Notification>

                    <Notification
                        dismissable
                        title="Twelve ziggurats quickly jumped a finch box Twelve."
                        styler={{ style: { bottom: '80px' } }}
                        id="notif_info"
                        multiline
                    >
                    </Notification>

                    <Notification
                        dismissable
                        title="Twelve ziggurats quickly jumped a finch box Twelve ziggurats quickly."
                        styler={{ style: { bottom: '176px' } }}
                        id="notif_info"
                        multiline full
                    >
                    </Notification>

                    {/* <Notification
                        dismissable
                        title="Long notification!"
                        styler={{ kind: 'warning' }}
                        id="notif_warning"
                        >
                        Twelve ziggurats quickly jumped a finch box Twelve ziggurats quickly jumped a finch box Twelve ziggurats quickly jumped a finch box
                        </Notification>

                        <Notification
                        dismissable
                        title="Long notification!"
                        styler={{ kind: 'success' }}
                        id="notif_success"
                        >
                        Twelve ziggurats quickly jumped a finch box Twelve ziggurats quikly jumped a finch box Twelve ziggurats quickly jumped a finch box
                    </Notification>*/}
                </ContentWrap>
            </div>
        );
    }
};

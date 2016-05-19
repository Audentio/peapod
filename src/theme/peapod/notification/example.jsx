import React from 'react';
import Pod from 'components.js';


module.exports = class NotificationExample extends React.Component {

    render() {
        const restoreNotifs = function () {
            window.location.reload();
        };

        return (
            <div>
                <Pod.ContentWrap>
                    <p><Pod.Button onClick={restoreNotifs} label="Restore all notifications" /></p>

                    <Pod.Notification dismissable id="notif_base">Hello there!</Pod.Notification>
                    <Pod.Notification dismissable title="Long notification!" styler={{ kind: 'danger' }} id="notif_danger">
                        Twelve ziggurats quickly jumped a finch box Twelve ziggurats quickly jumped a finch box Twelve ziggurats quickly jumped a finch box
                    </Pod.Notification>
                    <Pod.Notification dismissable title="Long notification!" styler={{ kind: 'info' }} id="notif_info">
                        Twelve ziggurats quickly jumped a finch box Twelve ziggurats quickly jumped a finch box Twelve ziggurats quickly jumped a finch box
                    </Pod.Notification>
                    <Pod.Notification dismissable title="Long notification!" styler={{ kind: 'warning' }} id="notif_warning">
                        Twelve ziggurats quickly jumped a finch box Twelve ziggurats quickly jumped a finch box Twelve ziggurats quickly jumped a finch box
                    </Pod.Notification>
                    <Pod.Notification dismissable title="Long notification!" styler={{ kind: 'success' }} id="notif_success">
                        Twelve ziggurats quickly jumped a finch box Twelve ziggurats quikly jumped a finch box Twelve ziggurats quickly jumped a finch box
                    </Pod.Notification>
                </Pod.ContentWrap>
            </div>
        );
    }
}

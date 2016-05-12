import React from 'react'
import Pod from 'components.js'


export default class AlertsSection extends React.Component {

    render () {
        var restoreAlerts = function(){
            for(var item in localStorage){
                if(item.indexOf('Pod_alert_')>=0){
                    localStorage.removeItem(item);
                    var name = item.split('Pod_alert_')[1].split('_hidden')[0];
                }

                window.location.reload()
            }
        }

        var restoreNotifs = function(){
            for(var item in localStorage){
                if(item.indexOf('Pod_notification_')>=0){
                    localStorage.removeItem(item);
                    var name = item.split('Pod_notification_')[1].split('_hidden')[0];
                }

                window.location.reload()
            }
        }

        return (
            <div>
                <Pod.Section key={'alerts'}>
                    <Pod.ContentWrap>

                        <Pod.Heading>Alerts</Pod.Heading>

                        <p><Pod.Button onClick={restoreAlerts} label="Restore all alerts" /></p>
                        <Pod.Alert dismissable={true} id="generalAlert">Jim quickly realized that the beautiful gowns are expensive.</Pod.Alert>
                        <Pod.Alert styler={{kind: 'info'}} dismissable={true} id="infoAlert">Jim quickly realized that the beautiful gowns are expensive.</Pod.Alert>
                        <Pod.Alert styler={{kind: 'success'}} dismissable={true} id="successAlert">Jim quickly realized that the beautiful gowns are expensive.</Pod.Alert>
                        <Pod.Alert styler={{kind: 'warning'}} dismissable={true} id="warningAlert">Jim quickly realized that the beautiful gowns are expensive.</Pod.Alert>
                        <Pod.Alert styler={{kind: 'danger'}} dismissable={true} id="dangerAlert">Jim quickly realized that the beautiful gowns are expensive.</Pod.Alert>

                    </Pod.ContentWrap>
                </Pod.Section>
                <Pod.Section key={'notifications'}>
                    <Pod.ContentWrap>
                        <Pod.Heading>Notifications</Pod.Heading>

                        <p><Pod.Button onClick={restoreNotifs} label="Restore all notifications" /></p>

                        <Pod.Notification dismissable={true} id="notif_base">Hello there!</Pod.Notification>
                        <Pod.Notification dismissable={true} title="Long notification!" styler={{kind: "danger"}} id="notif_danger">
                            Twelve ziggurats quickly jumped a finch box Twelve ziggurats quickly jumped a finch box Twelve ziggurats quickly jumped a finch box
                        </Pod.Notification>
                        <Pod.Notification dismissable={true} title="Long notification!" styler={{kind: "info"}} id="notif_info">
                            Twelve ziggurats quickly jumped a finch box Twelve ziggurats quickly jumped a finch box Twelve ziggurats quickly jumped a finch box
                        </Pod.Notification>
                        <Pod.Notification dismissable={true} title="Long notification!" styler={{kind: "warning"}} id="notif_warning">
                            Twelve ziggurats quickly jumped a finch box Twelve ziggurats quickly jumped a finch box Twelve ziggurats quickly jumped a finch box
                        </Pod.Notification>
                        <Pod.Notification dismissable={true} title="Long notification!" styler={{kind: "success"}} id="notif_success">
                            Twelve ziggurats quickly jumped a finch box Twelve ziggurats quikly jumped a finch box Twelve ziggurats quickly jumped a finch box
                        </Pod.Notification>

                    </Pod.ContentWrap>
                </Pod.Section>
            </div>
        )
    }

}

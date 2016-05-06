import React from 'react'
import ReactDOM from 'react-dom'
import 'components'
import Paragraph from 'components/paragraph'
import Strong from 'components/strong'
import Code from 'components/code'

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
                <Pod.section key={'alerts'}>
                    <Pod.contentWrap>

                        <Pod.heading>Alerts</Pod.heading>

                        <p><Pod.button onClick={restoreAlerts} label="Restore all alerts" /></p>
                        <Pod.alert dismissable={true} id="generalAlert">Jim quickly realized that the beautiful gowns are expensive.</Pod.alert>
                        <Pod.alert styler={{kind: 'info'}} dismissable={true} id="infoAlert">Jim quickly realized that the beautiful gowns are expensive.</Pod.alert>
                        <Pod.alert styler={{kind: 'success'}} dismissable={true} id="successAlert">Jim quickly realized that the beautiful gowns are expensive.</Pod.alert>
                        <Pod.alert styler={{kind: 'warning'}} dismissable={true} id="warningAlert">Jim quickly realized that the beautiful gowns are expensive.</Pod.alert>
                        <Pod.alert styler={{kind: 'danger'}} dismissable={true} id="dangerAlert">Jim quickly realized that the beautiful gowns are expensive.</Pod.alert>

                    </Pod.contentWrap>
                </Pod.section>
                <Pod.section key={'notifications'}>
                    <Pod.contentWrap>
                        <Pod.heading>Notifications</Pod.heading>

                        <p><Pod.button onClick={restoreNotifs} label="Restore all notifications" /></p>

                        <Pod.notification dismissable={true} id="notif_base">Hello there!</Pod.notification>
                        <Pod.notification dismissable={true} title="Long notification!" styler={{kind: "danger"}} id="notif_danger">
                            Twelve ziggurats quickly jumped a finch box Twelve ziggurats quickly jumped a finch box Twelve ziggurats quickly jumped a finch box
                        </Pod.notification>
                        <Pod.notification dismissable={true} title="Long notification!" styler={{kind: "info"}} id="notif_info">
                            Twelve ziggurats quickly jumped a finch box Twelve ziggurats quickly jumped a finch box Twelve ziggurats quickly jumped a finch box
                        </Pod.notification>
                        <Pod.notification dismissable={true} title="Long notification!" styler={{kind: "warning"}} id="notif_warning">
                            Twelve ziggurats quickly jumped a finch box Twelve ziggurats quickly jumped a finch box Twelve ziggurats quickly jumped a finch box
                        </Pod.notification>
                        <Pod.notification dismissable={true} title="Long notification!" styler={{kind: "success"}} id="notif_success">
                            Twelve ziggurats quickly jumped a finch box Twelve ziggurats quikly jumped a finch box Twelve ziggurats quickly jumped a finch box
                        </Pod.notification>

                    </Pod.contentWrap>
                </Pod.section>
            </div>
        )
    }

}
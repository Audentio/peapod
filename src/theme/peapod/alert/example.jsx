import React from 'react';
import Pod from 'utility/components.js';
import PureRender from 'utility/pureRender.js';


module.exports = class AlertExample extends React.Component {

	shouldComponentUpdate = PureRender;

    render() {
        const restoreAlerts = function () {
            window.location.reload();
        };

        return (
            <div>
                <Pod.ContentWrap>
                    <p><Pod.Button onClick={restoreAlerts} label="Restore all alerts" /></p>
                    <Pod.Alert dismissable id="generalAlert">Jim quickly realized that the beautiful gowns are expensive.</Pod.Alert>
                    <Pod.Alert styler={{ kind: 'info' }} dismissable id="infoAlert">Jim quickly realized that the beautiful gowns are expensive.</Pod.Alert>
                    <Pod.Alert styler={{ kind: 'success' }} dismissable id="successAlert">Jim quickly realized that the beautiful gowns are expensive.</Pod.Alert>
                    <Pod.Alert styler={{ kind: 'warning' }} dismissable id="warningAlert">Jim quickly realized that the beautiful gowns are expensive.</Pod.Alert>
                    <Pod.Alert styler={{ kind: 'danger' }} dismissable id="dangerAlert">Jim quickly realized that the beautiful gowns are expensive.</Pod.Alert>
                </Pod.ContentWrap>
            </div>
        );
    }

}

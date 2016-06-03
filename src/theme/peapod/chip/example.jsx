import React from 'react';
import Pod from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class ChipExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <div>
                <Pod.ContentWrap>
                    <Pod.Chip>This is a Chip</Pod.Chip> &nbsp;
                    <Pod.Chip deleteTrigger>Chip with Delete</Pod.Chip> &nbsp;
                    <Pod.Chip photo="assets/media/profile@2x.jpg">Chip with Photo</Pod.Chip> &nbsp;
                    <Pod.Chip deleteTrigger photo="assets/media/profile@2x.jpg">Chip with Delete & Photo</Pod.Chip> &nbsp;
                </Pod.ContentWrap>
            </div>
        );
    }
};

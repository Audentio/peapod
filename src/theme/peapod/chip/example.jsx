import React from 'react';
import Pod from 'components.js';

module.exports = class ChipExample extends React.Component {

    render() {
        return (
            <div>
                <Pod.ContentWrap>
                    <Pod.Chip>This is a Chip</Pod.Chip>
                    <Pod.Chip deleteTrigger>Chip with Delete</Pod.Chip>
                    <Pod.Chip photo="assets/media/profile@2x.jpg">Chip with Photo</Pod.Chip>
                    <Pod.Chip deleteTrigger photo="assets/media/profile@2x.jpg">Chip with Delete & Photo</Pod.Chip>
                </Pod.ContentWrap>
            </div>
        );
    }
};

import React from 'react';
import { ContentWrap, Chip } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class ChipExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <div>
                <ContentWrap>
                    <Chip>This is a Chip</Chip> &nbsp;
                    <Chip deleteTrigger>Chip with Delete</Chip> &nbsp;
                    <Chip photo="assets/media/profile@2x.jpg">Chip with Photo</Chip> &nbsp;
                    <Chip deleteTrigger photo="assets/media/profile@2x.jpg">Chip with Delete & Photo</Chip> &nbsp;
                </ContentWrap>
            </div>
        );
    }
};

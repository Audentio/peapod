import React from 'react';
import { ContentWrap, Icon, Select, Timestamp } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';
`<Select selected="anotheroption">
    <Select_Option value="option1">option 1</Select_Option>
    <Select_Option value="anotheroption">Another option</Select_Option>
    <Select_Option value="fancy_option"><Strong>Fancy option</Strong></Select_Option>
    <Select_Option value="lastopt">Last option</Select_Option>
</Select>`;

module.exports = class SelectExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <ContentWrap>
                <Select selected="selectedoption">
                    <option value="option1">option 1</option>
                    <option value="anotheroption">Another option</option>
                    <option value="selectedoption">Peapod Select</option>
                    <option value="fancy_option" selected><Timestamp time={1455670800} output="relative" /><Icon>access_time</Icon></option>
                    <option value="lastopt">Last option</option>
                </Select>

            </ContentWrap>
        );
    }

};

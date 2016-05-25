import React from 'react';
import Pod from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class TabsExample extends React.Component {

	shouldComponentUpdate = PureRender;

    render() {
        const tabs = [
            {
                trigger: 'tab 1',
                content: 'Tab 1 content',
            },
            {
                trigger: 'tab 2',
                content: 'Tab 2 content',
            },
            {
                trigger: 'tab 3',
                content: 'Tab 3 content',
            },
            {
                trigger: 'tab 4',
                content: 'Tab 4 content',
            },
            {
                trigger: 'tab 5',
                content: 'Tab 5 content',
            },
        ];

        return (
            <div>
                <Pod.ContentWrap>
                    <Pod.Tabs tabs={tabs} activeTab={1}></Pod.Tabs>
                </Pod.ContentWrap>
            </div>
        );
    }

}

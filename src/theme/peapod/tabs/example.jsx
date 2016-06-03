import React from 'react';
import Pod from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class TabsExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <Pod.ContentWrap>
                <Pod.Tabs activeTab={1}>
                    <Pod.Tabs_Tab trigger="tab 1">
                        Tab 1 content
                    </Pod.Tabs_Tab>
                    <Pod.Tabs_Tab trigger="tab 2">
                        Tab 2 content
                    </Pod.Tabs_Tab>
                    <Pod.Tabs_Tab trigger="tab 3">
                        Tab 3 content
                    </Pod.Tabs_Tab>
                    <Pod.Tabs_Tab trigger="tab 4">
                        Tab 4 content
                    </Pod.Tabs_Tab>
                    <Pod.Tabs_Tab trigger="tab 5">
                        Tab 5 content
                    </Pod.Tabs_Tab>
                </Pod.Tabs>
            </Pod.ContentWrap>
        );
    }

};

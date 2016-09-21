import React from 'react';
import { ContentWrap, Tabs, Tabs_Tab } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class TabsExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <ContentWrap>
                <Tabs activeTab={1}>
                    <Tabs_Tab trigger="tab 1">
                        Tab 1 content
                    </Tabs_Tab>
                    <Tabs_Tab trigger="tab 2">
                        Tab 2 content
                    </Tabs_Tab>
                    <Tabs_Tab trigger="tab 3">
                        Tab 3 content
                    </Tabs_Tab>
                    <Tabs_Tab trigger="tab 4">
                        Tab 4 content
                    </Tabs_Tab>
                    <Tabs_Tab trigger="tab 5">
                        Tab 5 content
                    </Tabs_Tab>
                </Tabs>
            </ContentWrap>
        );
    }

};

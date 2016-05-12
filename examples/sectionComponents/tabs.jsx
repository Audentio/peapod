import React from 'react'
import Pod from 'components.js';

export default class TabsSection extends React.Component {

    render () {
        var tabs = [
            {
                trigger: "tab 1",
                content: "Tab 1 content",
            },
            {
                trigger: "tab 2",
                content: "Tab 2 content"
            }
        ]

        return (
            <Pod.Section key={'tabs'}>
                <Pod.ContentWrap>
                    <Pod.Heading>Tabs</Pod.Heading>

                    <Pod.Tabs tabs={tabs} activeTab={1}></Pod.Tabs>
                    <Pod.Div>Testing</Pod.Div>
                </Pod.ContentWrap>
            </Pod.Section>
        )
    }

}

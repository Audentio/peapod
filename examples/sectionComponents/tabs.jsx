import React from 'react'
import ReactDOM from 'react-dom'
import 'components'
import Paragraph from 'components/paragraph'
import Strong from 'components/strong'
import Code from 'components/code'

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
            <Pod.section key={'tabs'}>
                <Pod.contentWrap>
                    <Pod.heading>Tabs</Pod.heading>

                    <Pod.tabs tabs={tabs} activeTab={1}></Pod.tabs>
                    <Pod.div>Testing</Pod.div>
                </Pod.contentWrap>
            </Pod.section>
        )
    }

}
import React from 'react'
import ReactDOM from 'react-dom'
import 'components'
import Paragraph from 'components/paragraph'
import Strong from 'components/strong'
import Code from 'components/code'

export default class BreadcrumbSection extends React.Component {

    render () {
        return (
            <Pod.section key={'breadcrumb'}n>
                <Pod.contentWrap>

                    <Pod.heading>Breadcrumb</Pod.heading>

                    <Pod.breadcrumb children={['Home', 'Forums', 'Subforums', 'Best way to handle these?']}></Pod.breadcrumb>
                </Pod.contentWrap>
            </Pod.section>
        )
    }

}
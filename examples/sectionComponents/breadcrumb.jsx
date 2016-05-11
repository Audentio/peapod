import React from 'react'
import Pod from 'components.js'

export default class BreadcrumbSection extends React.Component {

    render () {
        return (
            <Pod.Section key={'breadcrumb'}n>
                <Pod.ContentWrap>

                    <Pod.Heading>Breadcrumb</Pod.Heading>

                    <Pod.Breadcrumb children={['Home', 'Forums', 'Subforums', 'Best way to handle these?']}></Pod.Breadcrumb>
                </Pod.ContentWrap>
            </Pod.Section>
        )
    }

}

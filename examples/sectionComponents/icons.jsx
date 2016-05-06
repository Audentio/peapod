import React from 'react'
import ReactDOM from 'react-dom'
import 'components'
import Paragraph from 'components/paragraph'
import Strong from 'components/strong'
import Code from 'components/code'

export default class IconSection extends React.Component {

    render () {
        return (
            <Pod.section key={'icons'}>
                <Pod.contentWrap>
                    <Pod.heading>Icons</Pod.heading>

                    <h2>Size & color</h2>
                    <p>Currently simply a layer of abstration over google material icons</p>
                    <span style={{fontSize: '24px'}}>
                        <Pod.icon>home</Pod.icon>&nbsp;
                        <Pod.icon styler={{color: "#07ADD4"}}>assessment</Pod.icon>&nbsp;
                        <Pod.icon styler={{color: "#3F70E2"}}>polymer</Pod.icon>&nbsp;
                        <Pod.icon styler={{color: "#D53FD6"}}>question_answer</Pod.icon>&nbsp;
                        <Pod.icon styler={{color: "#FF6044"}}>whatshot</Pod.icon>
                    </span>

                </Pod.contentWrap>
            </Pod.section>
        )
    }

}
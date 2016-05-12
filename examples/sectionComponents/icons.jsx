import React from 'react'
import Pod from 'components.js'

export default class IconSection extends React.Component {

    render () {
        return (
            <Pod.Section key={'icons'}>
                <Pod.ContentWrap>
                    <Pod.Heading>Icons</Pod.Heading>

                    <h2>Size & color</h2>
                    <p>Currently simply a layer of abstration over google material icons</p>
                    <span style={{fontSize: '24px'}}>
                        <Pod.Icon>home</Pod.Icon>&nbsp;
                        <Pod.Icon styler={{color: "#07ADD4"}}>assessment</Pod.Icon>&nbsp;
                        <Pod.Icon styler={{color: "#3F70E2"}}>polymer</Pod.Icon>&nbsp;
                        <Pod.Icon styler={{color: "#D53FD6"}}>question_answer</Pod.Icon>&nbsp;
                        <Pod.Icon styler={{color: "#FF6044"}}>whatshot</Pod.Icon>
                    </span>

                </Pod.ContentWrap>
            </Pod.Section>
        )
    }

}

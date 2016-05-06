import React from 'react'
import ReactDOM from 'react-dom'
import 'components'
import Paragraph from 'components/paragraph'
import Strong from 'components/strong'
import Code from 'components/code'

export default class FixedSection extends React.Component {

    render () {
        return (
            <Pod.fixedElement key={'fixednavigation'} styler={{style: {top: 0, left: 0, width: '100%'}}}>
                <Pod.toolbar>
                    <Pod.contentWrap>
                        <Pod.icon styler={{style: {height: '32px', display: 'inline-block', lineHeight: '32px', width: '32px', float: 'left'}}}>menu</Pod.icon>

                        Fixed, Toolbar with icon and a &nbsp;

                        <Pod.menu trigger={
                            <Pod.button label="Button with Dropdown" />
                        }>
                            <Pod.menuItem href="#" subtext="1">
                                Something about something
                            </Pod.menuItem>
                            <Pod.menuItem href="#" subtext="2">Something else</Pod.menuItem>
                            <Pod.menuItem href="#" subtext="3">Another thing</Pod.menuItem>
                            <Pod.menuItem href="#" subtext="4">Yet another thing</Pod.menuItem>
                                <Pod.menu styler={{level:1}} trigger={
                                    <Pod.menuItem subtext={
                                        <Pod.icon styler={{style:{ fontSize: '0.9em' }}}>keyboard_arrow_right</Pod.icon>
                                    }>And another</Pod.menuItem>
                                }>
                                    <Pod.menuItem href="#">Another thing</Pod.menuItem>
                                    <Pod.menuItem href="#">Yet another thing</Pod.menuItem>
                                    <Pod.menuItem href="#">And another</Pod.menuItem>
                                    <Pod.menu styler={{level:1, left: true}} trigger={
                                        <Pod.menuItem subtext={
                                            <Pod.icon styler={{style:{ fontSize: '0.9em' }}}>keyboard_arrow_right</Pod.icon>
                                        }>And another</Pod.menuItem>
                                    }>
                                        <Pod.menuItem href="#">Another thing</Pod.menuItem>
                                        <Pod.menuItem href="#">Yet another thing</Pod.menuItem>
                                        <Pod.menuItem href="#">And another</Pod.menuItem>
                                    </Pod.menu>
                                </Pod.menu>
                        </Pod.menu>
                    </Pod.contentWrap>
                </Pod.toolbar>
            </Pod.fixedElement>
        )
    }

}
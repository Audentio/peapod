import React from 'react'
import ReactDOM from 'react-dom'
import 'components'
import Paragraph from 'components/paragraph'
import Strong from 'components/strong'
import Code from 'components/code'

export default class MenusSection extends React.Component {

    render () {
        return (
            <Pod.section key={'menus'}>
                <Pod.contentWrap>

                    <Pod.heading>Menus</Pod.heading>

                    <Pod.menu trigger={
                        <Pod.button label="On Hover" />
                    }>
                        <Pod.menuItem href="#" subtext="1">
                            Something about something
                        </Pod.menuItem>
                        <Pod.menuItem href="#" subtext="2">Something else</Pod.menuItem>
                        <Pod.menuItem href="#" subtext="3">Another thing</Pod.menuItem>
                        <Pod.divider></Pod.divider>
                        <Pod.menuItem href="#" subtext="4">Yet another thing</Pod.menuItem>
                            <Pod.menu styler={{level:1}} trigger={
                                <Pod.menuItem subtext="5">And another</Pod.menuItem>
                            }>
                                <Pod.menuItem href="#">Another thing</Pod.menuItem>
                                <Pod.menuItem href="#">Yet another thing</Pod.menuItem>
                                <Pod.menuItem href="#">And another</Pod.menuItem>
                                <Pod.menu styler={{level:1}} trigger={
                                    <Pod.menuItem subtext="5">And another</Pod.menuItem>
                                }>
                                    <Pod.menuItem href="#">Another thing</Pod.menuItem>
                                    <Pod.menuItem href="#">Yet another thing</Pod.menuItem>
                                    <Pod.menuItem href="#">And another</Pod.menuItem>
                                </Pod.menu>
                            </Pod.menu>
                    </Pod.menu>

                    <Pod.menu portal={true} trigger={
                        <Pod.button label="On Click" />
                    }>
                        <Pod.menuItem href="#" subtext="1">
                            Something about something
                        </Pod.menuItem>
                        <Pod.menuItem href="#" subtext="2">Something else</Pod.menuItem>
                        <Pod.menuItem href="#" subtext="3">Another thing</Pod.menuItem>
                        <Pod.menuItem href="#" subtext="4">Yet another thing</Pod.menuItem>
                            <Pod.menu styler={{level:1}} click={true} trigger={
                                <Pod.menuItem subtext="5">And another</Pod.menuItem>
                            }>
                                <Pod.menuItem href="#">Another thing</Pod.menuItem>
                                <Pod.menuItem href="#">Yet another thing</Pod.menuItem>
                                <Pod.menuItem href="#">And another</Pod.menuItem>
                                <Pod.menu click={true} styler={{level:1}} trigger={
                                    <Pod.menuItem subtext="5">And another</Pod.menuItem>
                                }>
                                    <Pod.menuItem href="#">Another thing</Pod.menuItem>
                                    <Pod.menuItem href="#">Yet another thing</Pod.menuItem>
                                    <Pod.menuItem href="#">And another</Pod.menuItem>
                                </Pod.menu>
                            </Pod.menu>
                    </Pod.menu>

                    <Pod.menu trigger={
                        <Pod.button label="On Hover from JSON" />
                    } json={[
                        {text: 'Hello World', href: '#'},
                        {text: 'Hello World 36', href: '#',
                            children: [
                                {text: 'Hello World 387', href: '#'},
                                {text: 'Hello World 123', href: '#', subtext: '2'}
                            ]
                        },
                        {text: 'Hello World 387', href: '#'},
                        {text: 'Hello World 123', href: '#', subtext: '2'}
                    ]} />


                </Pod.contentWrap>
            </Pod.section>
        )
    }

}
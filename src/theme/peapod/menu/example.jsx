import React from 'react';
import Pod from 'components.js';

module.exports = class MenuExample extends React.Component {

    render() {
        return (
            <div>
                <Pod.ContentWrap>

                    <Pod.Menu trigger={<Pod.Button label="On Hover" />}>
                        <Pod.Menu_Item href="#" subtext="1">
                            Something about something
                        </Pod.Menu_Item>
                        <Pod.Menu_Item href="#" subtext="2">Something else</Pod.Menu_Item>
                        <Pod.Menu_Item href="#" subtext="3">Another thing</Pod.Menu_Item>
                        <Pod.Divider></Pod.Divider>
                        <Pod.Menu_Item href="#" subtext="4">Yet another thing</Pod.Menu_Item>
                        <Pod.Menu
                            styler={{ level: 1 }}
                            trigger={<Pod.Menu_Item subtext="5">And another</Pod.Menu_Item>}
                        >
                            <Pod.Menu_Item href="#">Another thing</Pod.Menu_Item>
                            <Pod.Menu_Item href="#">Yet another thing</Pod.Menu_Item>
                            <Pod.Menu_Item href="#">And another</Pod.Menu_Item>
                            <Pod.Menu
                                styler={{ level: 1 }}
                                trigger={
                                    <Pod.Menu_Item subtext="5">And another</Pod.Menu_Item>
                                }
                            >
                                <Pod.Menu_Item href="#">Another thing</Pod.Menu_Item>
                                <Pod.Menu_Item href="#">Yet another thing</Pod.Menu_Item>
                                <Pod.Menu_Item href="#">And another</Pod.Menu_Item>
                            </Pod.Menu>
                        </Pod.Menu>
                    </Pod.Menu>

                    <Pod.Menu portal trigger={<Pod.Button label="On Click" />}>
                        <Pod.Menu_Item href="#" subtext="1">
                            Something about something
                        </Pod.Menu_Item>
                        <Pod.Menu_Item href="#" subtext="2">Something else</Pod.Menu_Item>
                        <Pod.Menu_Item href="#" subtext="3">Another thing</Pod.Menu_Item>
                        <Pod.Menu_Item href="#" subtext="4">Yet another thing</Pod.Menu_Item>
                        <Pod.Menu
                            styler={{ level: 1 }}
                            click
                            trigger={
                                <Pod.Menu_Item subtext="5">And another</Pod.Menu_Item>
                            }
                        >
                            <Pod.Menu_Item href="#">Another thing</Pod.Menu_Item>
                            <Pod.Menu_Item href="#">Yet another thing</Pod.Menu_Item>
                            <Pod.Menu_Item href="#">And another</Pod.Menu_Item>
                            <Pod.Menu
                                click
                                styler={{ level: 1 }}
                                trigger={
                                    <Pod.Menu_Item subtext="5">And another</Pod.Menu_Item>
                                }
                            >
                                <Pod.Menu_Item href="#">Another thing</Pod.Menu_Item>
                                <Pod.Menu_Item href="#">Yet another thing</Pod.Menu_Item>
                                <Pod.Menu_Item href="#">And another</Pod.Menu_Item>
                            </Pod.Menu>
                        </Pod.Menu>
                    </Pod.Menu>

                    <Pod.Menu
                        trigger={
                            <Pod.Button label="On Hover from JSON" />
                        }
                        json={[
                            { text: 'Hello World', href: '#' },
                            { text: 'Hello World 36', href: '#',
                                children: [
                                    { text: 'Hello World 387', href: '#' },
                                    { text: 'Hello World 123', href: '#', subtext: '2' },
                                ],
                            },
                            { text: 'Hello World 387', href: '#' },
                            { text: 'Hello World 123', href: '#', subtext: '2' },
                        ]}
                    />
                </Pod.ContentWrap>
            </div>
        );
    }

}

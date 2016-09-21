import React from 'react';
import { ContentWrap, Menu, Button, Menu_Item, Divider } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class MenuExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <div>
                <ContentWrap>

                    <Menu trigger={<Button label="On Hover" />}>
                        <Menu_Item href="#">
                            Something about something
                        </Menu_Item>
                        <Menu_Item href="#" subtext="2">Something else</Menu_Item>
                        <Menu_Item href="#" subtext="3">Another thing</Menu_Item>
                        <Divider></Divider>
                        <Menu_Item href="#" subtext="4">Yet another thing</Menu_Item>
                        <Menu
                            styler={{ level: 1 }}
                            trigger={<Menu_Item href="5" subtext="5">And another</Menu_Item>}
                        >
                            <Menu_Item href="#">Another thing</Menu_Item>
                            <Menu_Item href="#">Yet another thing</Menu_Item>
                            <Menu_Item href="#">And another</Menu_Item>
                            <Menu
                                styler={{ level: 1 }}
                                trigger={
                                    <Menu_Item href="#" subtext="5">And another</Menu_Item>
                                }
                            >
                                <Menu_Item href="#">Another thing</Menu_Item>
                                <Menu_Item href="#">Yet another thing</Menu_Item>
                                <Menu_Item href="#">And another</Menu_Item>
                            </Menu>
                        </Menu>
                    </Menu>

                    <Menu portal trigger={<Button label="On Click" />}>
                        <Menu_Item href="#" subtext="1">
                            Something about something
                        </Menu_Item>
                        <Menu_Item href="#" subtext="2">Something else</Menu_Item>
                        <Menu_Item href="#" subtext="3">Another thing</Menu_Item>
                        <Menu_Item href="#" subtext="4">Yet another thing</Menu_Item>
                        <Menu
                            styler={{ level: 1 }}
                            click
                            trigger={
                                <Menu_Item subtext="5">And another</Menu_Item>
                            }
                        >
                            <Menu_Item href="#">Another thing</Menu_Item>
                            <Menu_Item href="#">Yet another thing</Menu_Item>
                            <Menu_Item href="#">And another</Menu_Item>
                            <Menu
                                click
                                styler={{ level: 1 }}
                                trigger={
                                    <Menu_Item subtext="5">And another</Menu_Item>
                                }
                            >
                                <Menu_Item href="#">Another thing</Menu_Item>
                                <Menu_Item href="#">Yet another thing</Menu_Item>
                                <Menu_Item href="#">And another</Menu_Item>
                            </Menu>
                        </Menu>
                    </Menu>

                    <Menu
                        trigger={
                            <Button label="On Hover from JSON" />
                        }
                        json={[
                            { text: 'Hello World', href: '#' },
                            { text: 'Hello World 36', href: '#',
                                children: [
                                { text: 'Hello World 387', href: '#' },
                                { text: 'Hello World 123', href: '#', subtext: '2', props: {
                                    onClick: () => {
                                        alert('I\'ve been clicked');
                                    },
                                } },
                                ],
                            },
                            { text: 'Hello World 387', href: '#' },
                            { text: 'Hello World 123', href: '#', subtext: '2' },
                        ]}
                    />
                </ContentWrap>
            </div>
        );
    }

};

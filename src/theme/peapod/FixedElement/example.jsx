import React from 'react';
import { FixedElement, Toolbar, ContentWrap, Icon, Menu, Button, Menu_Item } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class FixedElementExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <div>
                <FixedElement addToScroll styler={{ style: { top: 0, right: 0, width: '100%', marginBottom: '200vh' } }} containerWidth>
                    <Toolbar>
                        <ContentWrap>
                            <Icon styler={{ style: { height: '32px', display: 'inline-block', lineHeight: '32px', width: '32px', float: 'left' } }}>menu</Icon>

                            Fixed, Toolbar with icon and a &nbsp;

                            <Menu trigger={<Button label="Button with Dropdown" />}>
                                <Menu_Item href="#" subtext="1">
                                    Something about something
                                </Menu_Item>
                                <Menu_Item href="#" subtext="2">Something else</Menu_Item>
                                <Menu_Item href="#" subtext="3">Another thing</Menu_Item>
                                <Menu_Item href="#" subtext="4">Yet another thing</Menu_Item>
                                <Menu
                                    styler={{ level: 1 }}
                                    trigger={
                                        <Menu_Item
                                            subtext={
                                                <Icon styler={{ style: { fontSize: '0.9em' } }}>keyboard_arrow_right</Icon>
                                            }
                                        >
                                            And another
                                        </Menu_Item>
                                    }
                                >
                                    <Menu_Item href="#">Another thing</Menu_Item>
                                    <Menu_Item href="#">Yet another thing</Menu_Item>
                                    <Menu_Item href="#">And another</Menu_Item>
                                    <Menu
                                        styler={{ level: 1, left: true }}
                                        trigger={
                                            <Menu_Item subtext={<Icon styler={{ style: { fontSize: '0.9em' } }}>keyboard_arrow_right</Icon>}>
                                                And another
                                            </Menu_Item>
                                        }
                                    >
                                        <Menu_Item href="#">Another thing</Menu_Item>
                                        <Menu_Item href="#">Yet another thing</Menu_Item>
                                        <Menu_Item href="#">And another</Menu_Item>
                                    </Menu>
                                </Menu>
                            </Menu>
                        </ContentWrap>
                    </Toolbar>
                </FixedElement>
            </div>
        );
    }
};

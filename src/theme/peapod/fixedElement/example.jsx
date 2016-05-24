import React from 'react';
import Pod from 'utility/components.js';

module.exports = class FixedElementExample extends React.Component {

    render() {
        return (
            <div>
                <Pod.FixedElement styler={{ style: { top: 0, right: 0, width: '100%' } }} containerWidth>
                    <Pod.Toolbar>
                        <Pod.ContentWrap>
                            <Pod.Icon styler={{ style: { height: '32px', display: 'inline-block', lineHeight: '32px', width: '32px', float: 'left' } }}>menu</Pod.Icon>

                            Fixed, Toolbar with icon and a &nbsp;

                            <Pod.Menu trigger={<Pod.Button label="Button with Dropdown" />}>
                                <Pod.Menu_Item href="#" subtext="1">
                                    Something about something
                                </Pod.Menu_Item>
                                <Pod.Menu_Item href="#" subtext="2">Something else</Pod.Menu_Item>
                                <Pod.Menu_Item href="#" subtext="3">Another thing</Pod.Menu_Item>
                                <Pod.Menu_Item href="#" subtext="4">Yet another thing</Pod.Menu_Item>
                                <Pod.Menu
                                    styler={{ level: 1 }}
                                    trigger={
                                        <Pod.Menu_Item
                                            subtext={
                                                <Pod.Icon styler={{ style: { fontSize: '0.9em' } }}>keyboard_arrow_right</Pod.Icon>
                                            }
                                        >
                                            And another
                                        </Pod.Menu_Item>
                                    }
                                >
                                    <Pod.Menu_Item href="#">Another thing</Pod.Menu_Item>
                                    <Pod.Menu_Item href="#">Yet another thing</Pod.Menu_Item>
                                    <Pod.Menu_Item href="#">And another</Pod.Menu_Item>
                                    <Pod.Menu
                                        styler={{ level: 1, left: true }}
                                        trigger={
                                            <Pod.Menu_Item subtext={<Pod.Icon styler={{ style: { fontSize: '0.9em' } }}>keyboard_arrow_right</Pod.Icon>}>
                                                And another
                                            </Pod.Menu_Item>
                                        }
                                    >
                                        <Pod.Menu_Item href="#">Another thing</Pod.Menu_Item>
                                        <Pod.Menu_Item href="#">Yet another thing</Pod.Menu_Item>
                                        <Pod.Menu_Item href="#">And another</Pod.Menu_Item>
                                    </Pod.Menu>
                                </Pod.Menu>
                            </Pod.Menu>
                        </Pod.ContentWrap>
                    </Pod.Toolbar>
                </Pod.FixedElement>
            </div>
        );
    }
}

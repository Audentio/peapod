import React from 'react';
// import ReactDOM from 'react-dom';
import Pod from 'utility/components.js';

export default class DamionDev extends React.Component {
// ugly but gives me more room to write :)

    constructor() {
        super();
        this.state = { validOne: false };

        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }

    onMouseEnter() {
        this.setState({ showtool: true });
    }
    onMouseLeave() {
        this.setState({ showtool: false });
    }
    validateInput(e) {
        this.setState({ validOne: e.isValid });
    }

    render() {
        return (
            <div key={'dev'} style={{ marginTop: '50px' }}>
                {/* <Pod.Json
                    json={{
                    DatePicker: {
                    date: '2017-11-20',
                    },
                    Menu: {
                    JsonParse: ['trigger'],
                    trigger: {
                    Button: {
                    label: 'on hover',
                    },
                    },
                    json: [
                    { text: 'Hello World', href: '#' },
                    { text: 'Hello World 36', href: '#',
                    children: [
                    { text: 'Hello World 387', href: '#' },
                    { text: 'Hello World 123', href: '#', subtext: '2' },
                    ],
                    },
                    { text: 'Hello World 387', href: '#' },
                    { text: 'Hello World 123', href: '#', subtext: '2' },
                    ],
                    },
                    }}
                />*/}

                <Pod.Section styler={{ mainStyle: { background: 'transparent' } }}>
                    <Pod.ContentWrap>
                        <Pod.Card styler={{ style: { width: '700px', margin: '0 auto', display: 'block' } }}>
                            <Pod.Stepper skippable>
                                <Pod.Stepper_Step title="Apples" validation={() => true}>
                                    {/* <Pod.Label>Email Address</Pod.Label>*/}
                                    <Pod.Input
                                        type="email"
                                        validate
                                        label="Hey"
                                        placeholder="email"
                                        required
                                        onChange={this.validateInput}
                                    />
                                </Pod.Stepper_Step>

                                <Pod.Stepper_Step title="Pears">
                                    <Pod.Paragraph>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </Pod.Paragraph>
                                </Pod.Stepper_Step>

                                <Pod.Stepper_Step title="Bananas">
                                    <Pod.Paragraph>Card Number</Pod.Paragraph>
                                    <Pod.Input label="Hey" placeholder="***************"></Pod.Input>
                                </Pod.Stepper_Step>
                            </Pod.Stepper>
                        </Pod.Card>
                    </Pod.ContentWrap>
                </Pod.Section>

                {/* <Pod.List style="square">
                    <Pod.List_Item>Hey</Pod.List_Item>
                </Pod.List>*/}

            </div>
        );
    }
}

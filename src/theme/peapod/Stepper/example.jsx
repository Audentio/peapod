import React from 'react';
import { Card, Stepper, Stepper_Step, Paragraph, Input } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class StepperExample extends React.Component {

    shouldComponentUpdate = PureRender;

    constructor() {
        super();
        this.state = { validOne: false };

        this.validateInput = this.validateInput.bind(this);
    }

    validateInput(e) {
        this.setState({ validOne: e.isValid });
    }

    render() {
        return (
            <Card styler={{ style: { width: '700px', display: 'block' } }}>
                <Stepper skippable singleForm >
                    <Stepper_Step title="Apples" validation={() => true}>
                        <Input
                            type="email"
                            validate
                            label="Hey"
                            placeholder="email"
                            required
                            onChange={this.validateInput}
                        />
                    </Stepper_Step>

                    <Stepper_Step title="Pears" validation={() => false}>
                        <Paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Paragraph>
                    </Stepper_Step>

                    <Stepper_Step title="Bananas" subtitle="Bananannannanana" validation={() => true}>
                        <Paragraph>Card Number</Paragraph>
                        <Input label="Hey" placeholder="***************"></Input>
                    </Stepper_Step>
                </Stepper>
            </Card>
        );
    }

};

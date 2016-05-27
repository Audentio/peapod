import React from 'react';
// import ReactDOM from 'react-dom';
import Pod from 'utility/components.js';

export default class DamionDev extends React.Component {
// ugly but gives me more room to write :)

    constructor() {
        super();
        this.state = { loaded: false };

        // this.onMouseEnter = this.onMouseEnter.bind(this);
        // this.onMouseLeave = this.onMouseLeave.bind(this);
    }

    componentDidMount() {
        const elem = this.refs.apples;

        const iObserver = new IntersectionObserver((crap) => {

            console.log(elem, crap);
            this.setState({ loaded: crap[0].intersectionRatio > 0 });

        }, { threshold: [0], rootMargin: '10% 0%' });
        iObserver.observe(elem);
    }

    render() {

        const currentContent = (this.state.loaded) ? <div>
            <Pod.Card styler={{ style: { width: '700px', display: 'block' } }}>
                <Pod.Stepper skippable singleForm >
                    <Pod.Stepper_Step title="Apples" validation={() => true}>
                        <Pod.Paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Pod.Paragraph>
                        <Pod.Paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Pod.Paragraph>
                        <Pod.Paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Pod.Paragraph>
                        <Pod.Paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Pod.Paragraph>
                    </Pod.Stepper_Step>

                    <Pod.Stepper_Step title="Pears" validation={() => false}>
                        <Pod.Paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Pod.Paragraph>
                    </Pod.Stepper_Step>

                    <Pod.Stepper_Step title="Bananas" subtitle="Bananannannanana" validation={() => true}>
                        <Pod.Paragraph>Card Number</Pod.Paragraph>
                        <Pod.Input label="Hey" placeholder="***************"></Pod.Input>
                    </Pod.Stepper_Step>
                </Pod.Stepper>
            </Pod.Card>
        </div> : <div>Loading</div>;

        return (
            <div key={'dev'} style={{ marginTop: '50px' }}>

                <Pod.Section styler={{ mainStyle: { background: 'transparent' } }}>
                    <Pod.ContentWrap>
                        <div style={{
                            margin: '100vh 0 0',
                        }} ref="apples"
                        >
                            <Pod.Center>{currentContent}</Pod.Center>
                        </div>

                    </Pod.ContentWrap>
                </Pod.Section>

            </div>
        );
    }
}

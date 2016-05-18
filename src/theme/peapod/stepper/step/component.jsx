import React from 'react';
import Pod_Styler from 'styler.js';
import { Button } from 'components.js';

module.exports = class Stepper_Step extends React.Component {

    static propTypes = {
        children: React.PropTypes.any,
    }

    constructor() {
        super();
        this.state = {
            complete: 0,
        };

        this.onContinue = this.onContinue.bind(this);
        this.onBack = this.onBack.bind(this);
    }

    onContinue() {
        this.setState({ complete: 100 });
        this.props.onContinue();
    }
    onBack() {
        this.setState({ complete: 100 });
        this.props.onBack();
    }

    render() {
        const style = Pod_Styler.getStyle(this);

        return (
            <div style={style.main}>
                {this.props.children}

                <br />
                <br />

                <Button label="Back" onClick={this.onBack}></Button>

                <div style={{ float: 'right' }}>
                    <Button label="Cancel"></Button>
                    <Button label="Continue" onClick={this.onContinue}></Button>
                </div>
            </div>
        );
    }

};

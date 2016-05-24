import React from 'react';
import Pod_Styler from 'utility/styler.js';
import { Button } from 'utility/components.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    static propTypes = {
        children: React.PropTypes.any,
        onContinue: React.PropTypes.func,
        onBack: React.PropTypes.func,
        validation: React.PropTypes.func,
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
        if (!this.props.validation || this.props.validation()) {
            this.props.onContinue();
        }
    }
    onBack() {
        this.setState({ complete: 100 });
        this.props.onBack();
    }

    render() {
        const style = Pod_Styler.getStyle(this);

        return (
            <div style={style.main}>
                <div style={style.content}>
                    {this.props.children}
                </div>

                <Button label="Back" onClick={this.onBack} />

                <div style={{ float: 'right' }}>
                    <Button label="Cancel" />
                    <Button label="Continue" onClick={this.onContinue} />
                </div>
            </div>
        );
    }
};

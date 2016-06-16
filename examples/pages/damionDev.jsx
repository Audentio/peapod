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

    render() {


        return (
            <div>
                <Pod.Input value="Input">
                </Pod.Input> <Pod.Button>Button</Pod.Button>
            </div>
        );
    }
}

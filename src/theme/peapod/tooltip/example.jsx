import React from 'react';
import Pod from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class AccordionExample extends React.Component {

    shouldComponentUpdate = PureRender;

    componentWillMount() {
        this.state = {
            show: false,
        };

        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }

    onMouseEnter(num) {
        this.setState({ [num]: true });
    }
    onMouseLeave(num) {
        this.setState({ [num]: false });
    }

    render() {
        return (
            <Pod.ContentWrap>

                <div style={{ position: 'relative', display: 'inline-block' }} onMouseEnter={() => this.onMouseEnter(4)} onMouseLeave={() => this.onMouseLeave(4)}>
                    ToolTip top
                    <Pod.Tooltip show={this.state[4]} styler={{ position: 'top' }}>Hello</Pod.Tooltip>
                </div>

                <br />

                <div style={{ position: 'relative', display: 'inline-block' }} onMouseEnter={() => this.onMouseEnter(1)} onMouseLeave={() => this.onMouseLeave(1)}>
                    ToolTip right
                    <Pod.Tooltip show={this.state[1]}>Hello</Pod.Tooltip>
                </div>

                <br />

                <div style={{ position: 'relative', display: 'inline-block' }} onMouseEnter={() => this.onMouseEnter(3)} onMouseLeave={() => this.onMouseLeave(3)}>
                    ToolTip bottom
                    <Pod.Tooltip show={this.state[3]} styler={{ position: 'bottom' }}>Hello</Pod.Tooltip>
                </div>

                <br />

                <div style={{ position: 'relative', display: 'inline-block' }} onMouseEnter={() => this.onMouseEnter(2)} onMouseLeave={() => this.onMouseLeave(2)}>
                    ToolTip left
                    <Pod.Tooltip show={this.state[2]} styler={{ position: 'left' }}>Hello</Pod.Tooltip>
                </div>

            </Pod.ContentWrap>
        );
    }

};

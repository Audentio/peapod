import React from 'react';
import { ContentWrap, Tooltip } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class TooltipExample extends React.Component {

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
            <ContentWrap>

                <div style={{ position: 'relative', display: 'inline-block' }} onMouseEnter={() => this.onMouseEnter(4)} onMouseLeave={() => this.onMouseLeave(4)}>
                    ToolTip top
                    <Tooltip show={this.state[4]} styler={{ position: 'top' }}>Hello</Tooltip>
                </div>

                <br />

                <div style={{ position: 'relative', display: 'inline-block' }} onMouseEnter={() => this.onMouseEnter(1)} onMouseLeave={() => this.onMouseLeave(1)}>
                    ToolTip right
                    <Tooltip show={this.state[1]}>Hello</Tooltip>
                </div>

                <br />

                <div style={{ position: 'relative', display: 'inline-block' }} onMouseEnter={() => this.onMouseEnter(3)} onMouseLeave={() => this.onMouseLeave(3)}>
                    ToolTip bottom
                    <Tooltip show={this.state[3]} styler={{ position: 'bottom' }}>Hello</Tooltip>
                </div>

                <br />

                <div style={{ position: 'relative', display: 'inline-block' }} onMouseEnter={() => this.onMouseEnter(2)} onMouseLeave={() => this.onMouseLeave(2)}>
                    ToolTip left
                    <Tooltip show={this.state[2]} styler={{ position: 'left' }}>Hello</Tooltip>
                </div>

            </ContentWrap>
        );
    }

};

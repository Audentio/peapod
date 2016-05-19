import React from 'react';
import Pod from 'components.js';

const rand = function (factor = 100) {
    return Math.floor(Math.random() * factor);
};

module.exports = class ProgressExamples extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            bars: [],
            circles: [],
        };

        this.types = ['base', 'primary', 'info', 'success', 'danger', 'warning', 'secondary'];
        this.nuts = false;
    }

    componentDidMount() {
        this.getRandom();
    }

    getRandom() {
        const bars = [];
        const circles = [];
        this.types.forEach((type) => {
            const random = rand();
            bars.push(
                <Pod.Progress key={type} value={rand()} styler={{ kind: type }} />
            );
            circles.push(
                <Pod.CircularProgress key={`${type}_circ`} value={random} styler={{ kind: type, style: { marginLeft: 15 } }}>
                    <span style={{ color: '#aaa' }}>{random}</span>
                </Pod.CircularProgress>
            );
        });
        this.setState({ bars, circles });
    }

    goNuts(e) {
        e.preventDefault();
        if (this.nuts) {
            clearInterval(this.nuts);
            this.nuts = false;
        } else {
            const _this = this;
            _this.nuts = setInterval(() => {
                _this.getRandom();
            }, 200);
        }
    }

    render() {
        return (
            <div key="something" onClick={this.getRandom}>
                <p style={{ marginBottom: '8px' }}>
                    <strong>Examples: </strong>Click on these to randomize [or <a href="#" onClick={this.goNuts}>Go nuts</a>]
                </p>

                <Pod.Grid>
                    <Pod.Grid_Cell styler={{ lg: 6 }}>
                        {this.state.bars}
                    </Pod.Grid_Cell>

                    <Pod.Grid_Cell styler={{ lg: 6 }}>
                        {this.state.circles}
                    </Pod.Grid_Cell>
                </Pod.Grid>
            </div>
        );
    }
}

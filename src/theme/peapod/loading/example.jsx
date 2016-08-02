import React from 'react';
import Pod from 'utility/components.js';

module.exports = class AccordionExample extends React.Component {

    // Constructor
    constructor(props, context) {
        super(props, context);

        this.state = {
            show: false,
            loaded: 0,
            loading: false,
        };

        this.onClick = this.onClick.bind(this);
        this.interval = '';
    }

    onClick() {
        this.setState({ show: true });
        clearInterval(this.interval);
        // test code
        setTimeout(() => {
            this.setState({ loading: true });
            const interval = this.interval = setInterval(() => {
                const loaded = (this.state.loaded < 100) ? this.state.loaded + 10 : 100;
                this.setState({ loaded });

                if (loaded >= 100) {
                    clearInterval(interval);
                    this.setState({
                        show: false,
                        loading: false,
                        loaded: 0,
                    });
                }
            }, 1000);
        }, 5000);
    }

    render() {
        const style = {
            width: '100%',
            height: 400,
            background: '#fff',
        };

        return (
            <Pod.ContentWrap>
                <Pod.Loading
                    show={this.state.show}
                    value="0"
                    loaded={this.state.loaded}
                    loading={this.state.loading}
                >
                    <div style={style}>
                        <Pod.Center>
                            <Pod.Button onClick={this.onClick}>Show Loading</Pod.Button>
                        </Pod.Center>
                    </div>
                </Pod.Loading>
            </Pod.ContentWrap>
        );
    }

};

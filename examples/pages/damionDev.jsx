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
                    </Pod.ContentWrap>
                </Pod.Section>

                {/* <Pod.List style="square">
                    <Pod.List_Item>Hey</Pod.List_Item>
                </Pod.List>*/}

            </div>
        );
    }
}

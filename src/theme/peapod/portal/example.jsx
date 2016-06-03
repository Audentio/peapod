import React from 'react';
import Pod from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class AccordionExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        const trigger = <Pod.Button>Open</Pod.Button>;

        return (
            <Pod.ContentWrap>
                <Pod.Portal
                    trigger={trigger}
                    closeOnOutsideClick
                >
                    <Pod.Card styler={{ style: { padding: '50px', margin: 0 } }}>
                        <Pod.Heading type="h4" styler={{ secondary: true }}>Card in Portal</Pod.Heading>
                    </Pod.Card>
                </Pod.Portal>
            </Pod.ContentWrap>
        );
    }

};

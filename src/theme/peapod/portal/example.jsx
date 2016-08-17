import React from 'react';
import { ContentWrap, Portal, Card, Heading, Button } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class PortalExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        const trigger = <Button>Open</Button>;

        return (
            <ContentWrap>
                <Portal
                    trigger={trigger}
                    closeOnOutsideClick
                >
                    <Card styler={{ style: { padding: '50px', margin: 0 } }}>
                        <Heading type="h4" styler={{ secondary: true }}>Card in Portal</Heading>
                    </Card>
                </Portal>
            </ContentWrap>
        );
    }

};

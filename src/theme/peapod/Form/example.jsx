import React from 'react';
import { ContentWrap, Paragraph, Input, Code, Checkbox, Radio, Hr } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';


module.exports = class FormExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <div>
                <ContentWrap>
                    <Paragraph>Placeholder can by styled with <Code>placeholderStyle</Code> styler prop</Paragraph>
                    <Input placeholder="Styled placeholders" styler={{ placeholderStyle: { color: 'red', opacity: '.4', textDecoration: 'underline' } }} />
                    <br />

                    <Paragraph>Basic Input types</Paragraph>
                    <Input placeholder="text" />
                    <br />
                    <Input placeholder="password" type="password" />
                    <br />
                    <Input placeholder="number" type="number" />
                    <br />
                    <Paragraph>
                        URL: Protocol <Code>http</Code> is added <Code>onBlur</Code> if none specificed
                    </Paragraph>
                    <Input placeholder="URL (http(s)/ftp)" type="url" validate validationResponse={{ invalid: 'Not a valid URL', valid: 'way to go!' }} />
                    <br />
                    <br />

                    <Paragraph>
                        <Strong>Validation</Strong>: doesn't run until blur. Thereafter it runs <Code>onChange</Code>
                    </Paragraph>

                    <Input placeholder="email (required)" type="email" required validate />
                    <br />
                    <Input placeholder="email (optional)" type="email" validate />
                    <br />
                    <br />

                    <Checkbox kind="primary" checked />
                    <br />
                    <br />

                    <Paragraph>Radio</Paragraph>
                    <div>
                        <Radio id="ra1" group="group1" label="item 1" />
                        <Radio id="ra2" group="group1" label="item 2" />
                        <Radio id="ra3" group="group1" label="item 3" />
                        <Radio id="ra4" group="group1" label="item 4" />
                    </div>
                    <Hr styler={{ style: { width: 100, margin: '15px 0' } }} />
                    <div>
                        <Radio group="group2" label="item A" />
                        <Radio group="group2" label="item B" />
                        <Radio group="group2" label="item C" />
                        <Radio group="group2" label="item D" />
                    </div>
                </ContentWrap>
            </div>
        );
    }
};

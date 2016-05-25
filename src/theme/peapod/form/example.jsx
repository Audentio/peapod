import React from 'react';
import Pod from 'utility/components.js';
import PureRender from 'utility/pureRender.js';


module.exports = class FormExample extends React.Component {

	shouldComponentUpdate = PureRender;

    render() {
        return (
            <div>
                <Pod.ContentWrap>
                    <Pod.Paragraph>Placeholder can by styled with <Pod.Code>placeholderStyle</Pod.Code> styler prop</Pod.Paragraph>
                    <Pod.Input placeholder="Styled placeholders" styler={{ placeholderStyle: { color: 'red', opacity: '.4', textDecoration: 'underline' } }} />
                    <br />

                    <Pod.Paragraph>Basic Input types</Pod.Paragraph>
                    <Pod.Input placeholder="text" />
                    <br />
                    <Pod.Input placeholder="password" type="password" />
                    <br />
                    <Pod.Input placeholder="number" type="number" />
                    <br />
                    <Pod.Paragraph>
                        URL: Protocol <Pod.Code>http</Pod.Code> is added <Pod.Code>onBlur</Pod.Code> if none specificed
                    </Pod.Paragraph>
                    <Pod.Input placeholder="URL (http(s)/ftp)" type="url" validate validationResponse={{ invalid: 'Not a valid URL', valid: 'way to go!' }} />
                    <br />
                    <br />

                    <Pod.Paragraph>
                        <Pod.Strong>Validation</Pod.Strong>: doesn't run until blur. Thereafter it runs <Pod.Code>onChange</Pod.Code>
                    </Pod.Paragraph>

                    <Pod.Input placeholder="email (required)" type="email" required validate />
                    <br />
                    <Pod.Input placeholder="email (optional)" type="email" validate />
                    <br />
                    <br />

                    <Pod.Checkbox kind="primary" checked />
                    <br />
                    <br />

                    <Pod.Paragraph>Radio</Pod.Paragraph>
                    <div>
                        <Pod.Radio id="ra1" group="group1" label="item 1" />
                        <Pod.Radio id="ra2" group="group1" label="item 2" />
                        <Pod.Radio id="ra3" group="group1" label="item 3" />
                        <Pod.Radio id="ra4" group="group1" label="item 4" />
                    </div>
                    <Pod.Hr styler={{ style: { width: 100, margin: '15px 0' } }} />
                    <div>
                        <Pod.Radio group="group2" label="item A" />
                        <Pod.Radio group="group2" label="item B" />
                        <Pod.Radio group="group2" label="item C" />
                        <Pod.Radio group="group2" label="item D" />
                    </div>
                </Pod.ContentWrap>
            </div>
        );
    }
}

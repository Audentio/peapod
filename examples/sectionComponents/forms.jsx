import React from 'react'
import ReactDOM from 'react-dom'
import 'components'
import Paragraph from 'components/paragraph'
import Strong from 'components/strong'
import Code from 'components/code'

export default class FormsSection extends React.Component {

    render () {

        return(
            <Pod.section key={'forms'}>
                <Pod.contentWrap>

                    <Pod.heading>Forms</Pod.heading>

                    <Paragraph>Placeholder can by styled with <Code>placeholderStyle</Code> styler prop</Paragraph>
                    <Pod.input placeholder="Styled placeholders" styler={{placeholderStyle: {color: 'red', opacity: '.4', textDecoration: 'underline'}}}/> <br />

                    <Paragraph>Basic Input types</Paragraph>
                    <Pod.input placeholder="text" styler={{scene:'material'}} /> <br />
                    <Pod.input placeholder="password" type="password" styler={{scene:'material'}} /> <br />
                    <Pod.input placeholder="number" type="number" styler={{scene:'material'}} /> <br />
                    <Paragraph>URL: Protocol <Code>http</Code> is added <Code>onBlur</Code> if none specificed</Paragraph>
                    <Pod.input placeholder="URL (http(s)/ftp)" type="url" styler={{scene:'material'}} validate validationResponse={{invalid: 'Not a valid URL', valid: 'way to go!'}} /> <br />

                    <br />

                    <Paragraph><Strong>Validation</Strong>: doesn't run until blur. Thereafter it runs <Code>onChange</Code></Paragraph>

                    <Pod.input placeholder="email (required)" type="email" required validate /> <br />
                    <Pod.input placeholder="email (optional)" type="email" styler={{scene:'material'}} validate /> <br />
                    <br />



                    <Pod.checkbox kind="primary" checked={true} />

                    <br /><br />

                    <Paragraph>Radio</Paragraph>
                    <div>
                        <Pod.radio id="ra1" group="group1" label="item 1" />
                        <Pod.radio id="ra2" group="group1" label="item 2" />
                        <Pod.radio id="ra3" group="group1" label="item 3" />
                        <Pod.radio id="ra4" group="group1" label="item 4" />
                    </div>
                    <Pod.hr styler={{style:{width:100,margin: '15px 0'}}} />
                    <div>
                        <Pod.radio group="group2" label="item A" />
                        <Pod.radio group="group2" label="item B" />
                        <Pod.radio group="group2" label="item C" />
                        <Pod.radio group="group2" label="item D" />
                    </div>

                </Pod.contentWrap>
            </Pod.section>
        )
    }

}
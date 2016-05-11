import React from 'react'
import Pod from 'components.js'

export default class MicroSection extends React.Component {

    render () {
        return (
            <Pod.Section key={'micro'}>
                <Pod.ContentWrap>

                    <Pod.Heading>Microcomponents</Pod.Heading>

                    <Pod.Heading kind="h5">Timestamps</Pod.Heading>
                    <Pod.Paragraph>Hover on timestamps to see absolute date-time. <Pod.Timestamp /></Pod.Paragraph>

                    <Pod.Strong>Input (one of the following)</Pod.Strong>
                    <Pod.Paragraph>
                        JS Date object <Pod.Code>`new Date("Thu, 05 Apr 2005 05:05:05 GMT")`</Pod.Code><br />
						ISO 8601 <Pod.Code>2016-02-16T19:00:00.000-05:00</Pod.Code><br />
						UNIX epoch time <Pod.Code>1455670800</Pod.Code><br />
						RFC 2822 (deprecated) <Pod.Code>Thu, 21 Dec 2000 16:01:07 +0200</Pod.Code><br />
					</Pod.Paragraph>

                    <Pod.Strong>Output</Pod.Strong>
                    <Pod.Paragraph>
                        <Pod.Code>output=relative</Pod.Code> <Pod.Timestamp time={1455670800} output="relative" /> <br />
                        <Pod.Code>output=calendar</Pod.Code> <Pod.Timestamp time={1455670800} output="calendar" /> <br />
                        <Pod.Code>output=calendar (with recent date)</Pod.Code> <Pod.Timestamp time={(new Date().setDate(new Date().getDate() -1))/1000} output="calendar" /> <br />
                        <Pod.Code>output=absolute (default)</Pod.Code> <Pod.Timestamp time={1455670800} /> <br />
                        <Pod.Code>{`showDate={false}`}</Pod.Code> <Pod.Timestamp time={1455670800} showDate={false}></Pod.Timestamp> <br />
                        <Pod.Code>{`showTime={false}`}</Pod.Code> <Pod.Timestamp time={1455670800} showTime={false}></Pod.Timestamp> <br />
                        <Pod.Code>{`format="ddd, hA" (overrides above settings)`}</Pod.Code> <Pod.Timestamp time={1455670800} format={'ddd, hA'}></Pod.Timestamp>
                    </Pod.Paragraph>

                    Page loaded <Pod.Timestamp output="relative" /> (updates automatically)<br />


				</Pod.ContentWrap>
            </Pod.Section>
        )
    }

}

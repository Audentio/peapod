import React from 'react'
import ReactDOM from 'react-dom'
import 'components'
import Paragraph from 'components/paragraph'
import Strong from 'components/strong'
import Code from 'components/code'

export default class MicroSection extends React.Component {

    render () {
        var tzTestTime = "2016-05-04T12:00:00Z";
        return (
            <Pod.section key={'micro'}>
                <Pod.contentWrap>

                    <Pod.heading>Microcomponents</Pod.heading>

                    <Pod.heading kind="h5">Timestamps</Pod.heading>
                    <Paragraph>Hover on timestamps to see absolute date-time.</Paragraph>

                    <Strong>Input (one of the following)</Strong>
                    <Paragraph>
                        JS Date object <Code>new Date("Thu, 05 Apr 2005 05:05:05 GMT")</Code><br />
                        ISO 8601 <Code>2016-02-16T19:00:00.000-05:00</Code><br />
                        UNIX time <Code>1455670800</Code><br />
                        RFC 2822 (deprecated) <Code>Thu, 21 Dec 2000 16:01:07 +0200</Code><br />
                    </Paragraph>

                        <Code>output=relative</Code> <Pod.timestamp time={1462567683} timezone="UTC"/> <br />
                        <Code>output=relative</Code> <Pod.timestamp time={1462567683} timezone="Asia/Kolkata" /> <br />
                        <Code>output=relative</Code> <Pod.timestamp time={1462567683} timezone="America/Chicago" /> <br />

                    <Strong>Output</Strong>
                    <Paragraph>
                        <Code>output=relative</Code> <Pod.timestamp time={1455670800} output="relative" /> <br />
                        <Code>output=calendar</Code> <Pod.timestamp time={1455670800} output="calendar" /> <br />
                        <Code>output=calendar (with recent date)</Code> <Pod.timestamp time={(new Date().setDate(new Date().getDate() -1))/1000} output="calendar" /> <br />
                        <Code>output=absolute (default)</Code> <Pod.timestamp time={1455670800} /> <br />
                        <Code>{`showDate={false}`}</Code> <Pod.timestamp time={1455670800} showDate={false}></Pod.timestamp> <br />
                        <Code>{`showTime={false}`}</Code> <Pod.timestamp time={1455670800} showTime={false}></Pod.timestamp> <br />
                        <Code>{`format="ddd, hA" (overrides above settings)`}</Code> <Pod.timestamp time={1455670800} format={'ddd, hA'}></Pod.timestamp>
                    </Paragraph>

                    <Strong>Timezone control</Strong>
                    <Paragraph>
                        Same dateTime used for all examples (<Code>2016-05-04T12:00:00Z</Code>). UTC is default for input, client timezone is default for output<br /><br />

                        <Code>just time passed</Code> <Pod.timestamp time={tzTestTime} /> <br />
                        <Code>showTimezone=false</Code> <Pod.timestamp time={tzTestTime} showTimezone={false} /> <br />
                        <Code>timezone=America/Chicago</Code> <Pod.timestamp time={tzTestTime} timezone="America/Chicago" /> <br />
                        <Code>timezone=America/New_York</Code> <Pod.timestamp time={tzTestTime} timezone="America/New_York" /> <br />
                        <Code>outputTimezone=America/Chicago</Code> <Pod.timestamp time={tzTestTime} outputTimezone="America/Chicago" /> <br />
                        <Code>outputTimezone=America/New_York</Code> <Pod.timestamp time={tzTestTime} outputTimezone="America/New_York" /> <br />
                        <Code>timezone=Asia/Kolkata, outputTimezone=America/Chicago</Code> <Pod.timestamp time={tzTestTime} timezone="Asia/Kolkata" outputTimezone="America/Chicago" /> <br />
                    </Paragraph>

                    Page loaded <Pod.timestamp output="relative" /> (updates automatically)<br />


                </Pod.contentWrap>
            </Pod.section>
        )
    }

}

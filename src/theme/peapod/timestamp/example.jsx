import React from 'react';
import { ContentWrap, Heading, Paragraph, Strong, Code, Timestamp } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class TimestampExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        const tzTestTime = '2016-05-04T12:00:00Z';
        return (
            <ContentWrap>
                <Heading kind="h5">Timestamps</Heading>
                <Paragraph>Hover on Timestamps to see absolute date-time.</Paragraph>

                <Strong>Input (one of the following)</Strong>
                <Paragraph>
                    JS Date object <Code>new Date("Thu, 05 Apr 2005 05:05:05 GMT")</Code><br />
                    ISO 8601 <Code>2016-02-16T19:00:00.000-05:00</Code><br />
                    UNIX time <Code>1455670800</Code><br />
                    RFC 2822 (deprecated) <Code>Thu, 21 Dec 2000 16:01:07 +0200</Code><br />
                </Paragraph>

                <Strong>Output</Strong>
                <Paragraph>
                    <Code>output=relative</Code> <Timestamp time={1455670800} output="relative" /> <br />
                    <Code>output=calendar</Code> <Timestamp time={1455670800} output="calendar" /> <br />
                    <Code>output=calendar (with recent date)</Code> <Timestamp time={(new Date().setDate(new Date().getDate() - 1)) / 1000} output="calendar" /> <br />
                    <Code>output=absolute (default)</Code> <Timestamp time={1455670800} /> <br />
                    <Code>{'showDate={false}'}</Code> <Timestamp time={1455670800} showDate={false}></Timestamp> <br />
                    <Code>{'showTime={false}'}</Code> <Timestamp time={1455670800} showTime={false}></Timestamp> <br />
                    <Code>{'format="ddd, hA" (overrides above settings)'}</Code> <Timestamp time={1455670800} format={'ddd, hA'}></Timestamp>
                </Paragraph>

                <Strong>Timezone control</Strong>
                <Paragraph>
                    Same dateTime used for all examples (<Code>2016-05-04T12:00:00Z</Code>). UTC is default for input, client timezone is default for output<br /><br />

                    <Code>just time passed</Code> <Timestamp showTimezone time={tzTestTime} /> <br />
                    <Code>showTimezone=false</Code> <Timestamp time={tzTestTime} showTimezone={false} /> <br />
                    <Code>timezone=America/Chicago</Code> <Timestamp showTimezone time={tzTestTime} timezone="America/Chicago" /> <br />
                    <Code>timezone=America/New_York</Code> <Timestamp showTimezone time={tzTestTime} timezone="America/New_York" /> <br />
                    <Code>outputTimezone=America/Chicago</Code> <Timestamp showTimezone time={tzTestTime} outputTimezone="America/Chicago" /> <br />
                    <Code>outputTimezone=America/New_York</Code> <Timestamp showTimezone time={tzTestTime} outputTimezone="America/New_York" /> <br />
                    <Code>timezone=Asia/Kolkata, outputTimezone=America/Chicago</Code> <Timestamp time={tzTestTime} timezone="Asia/Kolkata" outputTimezone="America/Chicago" /> <br />
                </Paragraph>

                Page loaded <Timestamp output="relative" /> (updates automatically)<br />

            </ContentWrap>
        );
    }
};

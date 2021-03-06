import React from 'react';
import { ContentWrap, Scrollable, Device } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class DeviceExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <div>
                <ContentWrap>

                    <Scrollable horizontal styler={{ center: true }} >
                        <Device device="iphone" variant="spacegrey" versio={6} styler={{ style: { display: 'inline-block' } }}></Device>

                        <Device device="iphone" variant="rosegold" styler={{ style: { display: 'inline-block' } }}></Device>

                        <Device device="iphone" variant="gold" styler={{ scrollable: true, style: { display: 'inline-block' } }}></Device>


                        <Device device="phone" variant="silver" orientation="horizontal" styler={{ scrollable: true, style: { display: 'inline-block' } }} ></Device>
                    </Scrollable>

                    <Scrollable horizontal styler={{ center: true }} >
                        <Device device="macbook" variant="gold" styler={{ style: { display: 'inline-block' } }} ></Device>

                        <Device device="macbook" variant="spacegrey" styler={{ style: { display: 'inline-block' } }}></Device>

                        <Device device="macbook" variant="silver" styler={{ style: { display: 'inline-block' } }}></Device>
                    </Scrollable>

                    <Scrollable horizontal styler={{ center: true }} >
                        <Device device="macbookpro" versions="15" variant="2015" styler={{ style: { display: 'inline-block' } }} ></Device>

                        <Device device="macbookpro" versions="13" variant="2015" styler={{ style: { display: 'inline-block' } }}></Device>
                    </Scrollable>

                    <Scrollable horizontal styler={{ center: true }} >
                        <Device device="imac" version="2016" variant="silver" styler={{ style: { display: 'inline-block' } }} ></Device>
                    </Scrollable>

                    <Scrollable horizontal styler={{ center: true }} >
                        <Device device="ipadpro" version="12" variant="silver" styler={{ style: { display: 'inline-block' } }} ></Device>

                        <Device device="ipadpro" version="12" variant="spacegrey" styler={{ style: { display: 'inline-block' } }} ></Device>

                        <Device device="ipadpro" version="12" variant="gold" styler={{ style: { display: 'inline-block' } }} ></Device>

                        <Device device="ipadpro" version="12" variant="rosegold" styler={{ style: { display: 'inline-block' } }} ></Device>
                    </Scrollable>

                    <br className="clear" />
                </ContentWrap>
            </div>
        );
    }
};

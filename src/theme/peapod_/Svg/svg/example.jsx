import React from 'react';
import { Svg } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class SvgExample extends React.Component {

	    shouldComponentUpdate = PureRender;

    render() {
        return (
            <Svg file="/assets/devices/iMac.svg" />
        );
    }

};

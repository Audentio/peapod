/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

import React, { PropTypes } from 'react';
import Pod_Styler from 'utility/styler.js';
import { Block, Heading, Divider, Paragraph } from 'utility/components.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    static propTypes = {
        children: PropTypes.string,
        icon: PropTypes.string,
        secondary: PropTypes.string,
        main: PropTypes.string,
        bar: PropTypes.bool,
        paragraph: PropTypes.string,
    }

    render() {
        const style = Pod_Styler.getStyle(this);

        const icon = (this.props.icon !== undefined) ? (
            <img src={`assets/images/icons/${this.props.icon}.svg`} style={{ height: '50px', width: '50px', marginBottom: '20px' }} alt="" />
        ) : '';

        const secondary = (this.props.secondary !== undefined) ? (
            <Heading kind="h6" weight="300" styler={{ secondary: true }} upper>
                {this.props.secondary}
            </Heading>
        ) : '';

        const main = (this.props.main !== undefined) ? (
            <Heading kind="h4" weight="400" styler={{ secondary: true }} upper>
                {this.props.main}
            </Heading>
        ) : '';

        const bar = (!this.props.bar) ? (
            <Divider styler={{ style: { width: '20%' } }} />
        ) : '';

        const paragraph = (this.props.paragraph !== undefined) ? (
            <Paragraph styler={{ secondary: true, style: { maxWidth: '60%' } }}>
                {this.props.paragraph}
            </Paragraph>
        ) : '';

        return (
            <Block align="center" styler={{ style: style.main }}>
                {icon}

                {secondary}

                {main}

                {bar}

                {paragraph}
            </Block>
        );
    }

};

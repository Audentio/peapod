/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

import React, { PropTypes } from 'react';
import Styler from 'utility/styler.js';
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
        const classes = Styler.getClasses(this);

        const icon = (this.props.icon !== undefined) ? (
            <img src={`assets/images/icons/${this.props.icon}.svg`} style={{ height: '50px', width: '50px', marginBottom: '20px' }} alt="" />
        ) : '';

        const secondary = (this.props.secondary !== undefined) ? (
            <Heading kind="h6" styler={{ h6Style: { fontWeight: 300 }, secondary: true }} upper>
                {this.props.secondary}
            </Heading>
        ) : '';

        const main = (this.props.main !== undefined) ? (
            <Heading kind="h4" styler={{ h4Style: { fontWeight: 400 }, secondary: true }} upper>
                {this.props.main}
            </Heading>
        ) : '';

        const bar = (!this.props.bar) ? (
            <Divider styler={{ style: { width: '60px' } }} />
        ) : '';

        const paragraph = (this.props.paragraph !== undefined) ? (
            <Paragraph styler={{ secondary: true, style: { maxWidth: '60%' } }}>
                {this.props.paragraph}
            </Paragraph>
        ) : '';

        return (
            <Block align="center" className={classes.main}>
                {icon}

                {secondary}

                {main}

                {bar}

                {paragraph}
            </Block>
        );
    }

};

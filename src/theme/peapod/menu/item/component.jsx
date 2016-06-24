import React from 'react';
import Pod_Styler from 'utility/styler.js';
import { Button, Anchor } from 'utility/components.js';
import pureRender from 'utility/pureRender.js';

module.exports = componentName => class Pod_Component extends React.Component {

    shouldComponentUpdate = pureRender;

    static displayName = componentName;

    static defaultProps = {
        subtext: ' ',
    }

    static propTypes = {
        children: React.PropTypes.any,
        subtext: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.object,
        ]),
        href: React.PropTypes.string,
        textstyle: React.PropTypes.string,

        kind: React.PropTypes.string,
        type: React.PropTypes.string,
        dialog: React.PropTypes.bool,
        dense: React.PropTypes.bool,
    }

    render() {
        const style = Pod_Styler.getStyle(this);

        const { kind, type, dialog, dense, href, textstyle, children, subtext: subtextProp, ...otherprops } = this.props;

        let subtext = (subtextProp) ? (<span style={style.subtext}>{subtextProp}</span>) : '';

        let returned;

        if (href && textstyle === 'button') {
            returned = (
                <Button
                    href={href}
                    styler={{
                        kind: kind || 'general',
                        type: type || 'text',
                        dialog: dialog || false,
                        dense: dense || false,
                        style: style.button,
                    }}
                    {...otherprops}
                >
                    {children}
                    {subtext}
                </Button>
            );
        } else if (textstyle === 'button') {
            returned = (
                <Button
                    styler={{
                        kind: kind || 'general',
                        type: type || 'text',
                        dialog: dialog || false,
                        dense: dense || false,
                        style: style.button,
                    }}
                    {...otherprops}
                >
                    {children}
                    {subtext}
                </Button>
            );
        } else if (href) {
            returned = (<div style={style.main}>
                <Anchor to={href} styler={{ style: style.anchor }} {...otherprops}>
                    {children}
                    {subtext}
                </Anchor>
            </div>);
        } else {
            returned = (
                <div style={style.main} {...otherprops}>
                    {children}
                    {subtext}
                </div>
            );
        }
        return returned;
    }
};

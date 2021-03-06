import React from 'react';
import Styler from 'utility/styler.js';
import { Button, Anchor } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = componentName => class Pod_Component extends React.Component {

    shouldComponentUpdate = PureRender;

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
        const classes = Styler.getClasses(this);

        const { kind, type, dialog, dense, href, textstyle, children, subtext: subtextProp, ...otherprops } = this.props;

        let subtext = (subtextProp) ? (<span className={classes.subtext}>{subtextProp}</span>) : '';

        let returned;

        if (href && textstyle === 'button') {
            returned = (
                <Button
                    href={href}
                    className={classes.button}
                    styler={{
                        kind: this.props.kind || 'general',
                        type: this.props.type || 'text',
                        dialog: this.props.dialog || false,
                        dense: this.props.dense || false,
                    }}
                >
                    {children}
                    {subtext}
                </Button>
            );
        } else if (textstyle === 'button') {
            returned = (
                <Button
                    className={classes.button}
                    styler={{
                        kind: this.props.kind || 'general',
                        type: this.props.type || 'text',
                        dialog: this.props.dialog || false,
                        dense: this.props.dense || false,
                    }}
                >
                    {children}
                    {subtext}
                </Button>
            );
        } else if (href) {
            returned = (<div className={classes.main}>
                <Anchor to={href} className={classes.anchor}>
                    {children}
                    {subtext}
                </Anchor>
            </div>);
        } else {
            returned = (
                <div {...otherprops} className={classes.main}>
                    {children}
                    {subtext}
                </div>
            );
        }
        return returned;
    }
};

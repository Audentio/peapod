import React from 'react';
import Pod_Styler from 'utility/styler.js';
import { Button, Anchor } from 'utility/components.js';

module.exports = componentName => class Pod_Component extends React.Component {

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

        let subtext = (this.props.subtext) ? (<span style={style.subtext}>{this.props.subtext}</span>) : '';

        let returned;
        if (this.props.href && this.props.textstyle === 'button') {
            returned = (
                <Button href={this.props.href} styler={{ kind: 'general' }}>
                    {this.props.children}
                    {subtext}
                </Button>
        );
        } else if (this.props.textstyle === 'button') {
            returned = (
                <Button
                    styler={{
                        kind: this.props.kind || 'general',
                        type: this.props.type || 'text',
                        dialog: this.props.dialog || false,
                        dense: this.props.dense || false,
                        style: style.button,
                    }}
                >
                    {this.props.children}
                    {subtext}
                </Button>
            );
        } else if (this.props.href) {
            returned = (<div style={style.main}>
                <Anchor to={this.props.href} styler={{ style: style.anchor }}>
                    {this.props.children}
                    {subtext}
                </Anchor>
            </div>);
        } else {
            returned = (
                <div style={style.main}>
                    {this.props.children}
                    {subtext}
                </div>
            );
        }
        return returned;
    }
};

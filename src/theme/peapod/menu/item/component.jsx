import React from 'react';
import Pod_Styler from 'utility/styler.js';
import { Button, Anchor } from 'utility/components.js';

module.exports = class Menu_Item extends React.Component {
    static defaultProps = {
        subtext: ' ',
    }

    render() {
        var style = Pod_Styler.getStyle(this);

        var subtext = (this.props.subtext) ? (<div style={style.subtext}>{this.props.subtext}</div>) : '';

        let returned;
        if (this.props.href && this.props.style === 'button') {
            returned = (<Button href={this.props.href} styler={{ kind: 'general' }}>
                {subtext}
                {this.props.children}
            </Button>);
        } else if (this.props.style === 'button') {
            returned = (<Button styler={{ kind: 'general' }}>
                {subtext}
                {this.props.children}
            </Button>);
        } else if (this.props.href) {
            returned = (<div style={style.main}>
                <Anchor to={this.props.href} style={style.anchor}>
                    {subtext}
                    {this.props.children}
                </Anchor>
            </div>);
        } else {
            returned = (
                <div style={style.main}>
                    {subtext}
                    {this.props.children}
                </div>
            );
        }
        return returned;
    }
};

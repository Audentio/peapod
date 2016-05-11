import React from 'react';
import Pod_Styler from 'styler.js';

module.exports = class Menu_Item extends React.Component {
	static defaultProps = {
	    subtext: ' '
	}

    render() {
        var style = Pod_Styler.getStyle(this);

        var subtext = (this.props.subtext) ? (<div style={style.subtext}>{this.props.subtext}</div>) : '';

        if (this.props.href) {
            return (
                <div style={style.main}>
                    <a href={this.props.href} style={style.anchor}>
                        {subtext}
                        {this.props.children}
                    </a>
                </div>
            )
        } else {
            return (
                <div style={style.main}>
                    {subtext}
                    {this.props.children}
                </div>
            )
        }
    }
};

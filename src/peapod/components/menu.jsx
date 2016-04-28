import React from 'react';
import ReactDOM from 'react-dom';
var Pod_Styler = require('../styler.jsx');
var Wrapper = require('../wrapper.jsx')

class Menu extends React.Component {
    constructor() {
        super();

        this.state = {
            show: false
        }
    }

    mouseEnter() {
        this.setState({show: true})
    }
    mouseLeave() {
        this.setState({show: false})
    }

    render() {
        var style = Pod_Styler.getStyle(this);
        var children =  (this.state.show) ? (
            <div style={style.main}>
                {this.props.children}
            </div>
        ) : "";

        if (this.props.portal) {
            return(
                <Pod.portal
                    trigger={this.props.trigger}
                    closeOnOutsideClick={true}
                    noArrow={true}
                >
                    <div style={style.portal}>
                        {this.props.children}
                    </div>
                </Pod.portal>
            )
        } else {
            return (
                <div style={style.trigger}
                    onMouseOver={() => {
                        if (!this.props.click)
                        this.mouseEnter()
                    }}
                    onMouseLeave={() => {
                        if (!this.props.click)
                        this.mouseLeave()
                    }}
                    onMouseDown={() => {
                        if (this.props.click)
                        this.mouseEnter()
                    }}
                >
                    {this.props.trigger}
                    {children}
                </div>
            )
        }
    }
};

Menu.defaultProps = {
    click: false
};

module.exports = Wrapper(Menu);

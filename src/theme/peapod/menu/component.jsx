import React from 'react';
import Pod_Styler from 'styler.js';
import Wrapper from 'wrapper.jsx';
import {Portal, Menu as Pod_Menu, Menu_Item} from 'components.js'

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

        var childrencomonents = this.props.children;
        // Allow passing of JSON
        if (this.props.json) {
            var childrencomonents = []
            var childjson = this.props.json
            for (var i = childjson.length - 1; i >= 0; i--) {
                // key needs updating to always be unique

                if (childjson[i].children != undefined) {
                    childrencomonents.push(
                        <Pod_Menu
                            styler={{level:1}}
                            key={i}
                            json={childjson[i].children}
                            trigger={
                                <Menu_Item key={i} href={childjson[i].href} subtext={childjson[i].subtext}>{childjson[i].text}</Menu_Item>
                            }
                        />
                    )
                } else {
                    childrencomonents.push(
                       <Menu_Item key={i} href={childjson[i].href} subtext={childjson[i].subtext}>{childjson[i].text}</Menu_Item>
                    )
                }
            }
        }

        // Allow showing of children for non portal menus
        var children =  (this.state.show) ? (
            <div style={style.main}>
                {childrencomonents}
            </div>
        ) : "";

        var hassubtext = false;

        // console.log(this.props.children)
        // for (var i = this.props.children.length - 1; i >= 0; i--) {
        //     var newObj = new Object(this.props.children[i]);
        //     if ('subtext' in newObj.props) {
        //         hassubtext = true;
        //         console.log(hassubtext)
        //         continue;
        //     }
        // }

        // if (hassubtext) {
        //    for (var i = this.props.children.length - 1; i >= 0; i--) {
        //         var newObj = new Object(this.props.children[i]);
        //         if ('subtext' in newObj.props) {
        //         } else {
        //             this.props.children[i].props.subtext = ''
        //         }
        //     }
        // }

        if (this.props.portal) {
            return(
                <Portal
                    trigger={this.props.trigger}
                    closeOnOutsideClick={true}
                    noArrow={true}
                >
                    <div style={style.portal}>
                        {childrencomonents}
                    </div>
                </Portal>
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
    click: false,
    json: false
};

module.exports = Wrapper(Menu);

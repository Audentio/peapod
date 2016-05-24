import React from 'react';
import Pod_Styler from 'utility/styler.js';
import { Portal, Menu, Button as Pod_Menu, Menu_Item, Button } from 'utility/components.js';

module.exports = function (componentName) {
    return class Pod_Component extends React.Component {

        static displayName = componentName;
        constructor() {
            super();

            this.state = {
                show: false,
            };
        }

        static defaultProps = {
            click: false,
            json: false,
            orientation: 'horizontal',
        }

        static propTypes = {
            click: React.PropTypes.bool,
            orientation: React.PropTypes.string,
            json: React.PropTypes.oneOfType([
                React.PropTypes.bool,
                React.PropTypes.object,
                React.PropTypes.array,
            ]),
            portal: React.PropTypes.bool,
            trigger: React.PropTypes.any,
            children: React.PropTypes.any,
        }

        mouseEnter() {
            this.setState({ show: true });
        }
        mouseLeave() {
            this.setState({ show: false });
        }

        render() {
            const style = Pod_Styler.getStyle(this);

            let childrencomonents = this.props.children;

            // Allow passing of JSON
            if (this.props.json) {
                childrencomonents = [];
                const childjson = this.props.json;
                for (let i = childjson.length - 1; i >= 0; i--) {
                    // key needs updating to always be unique

                    if (childjson[i].children !== undefined) {
                        childrencomonents.push(
                            <Pod_Menu
                                styler={{ level: 1 }}
                                key={i}
                                json={childjson[i].children}
                                trigger={
                                    <Menu_Item
                                        key={i}
                                        href={childjson[i].href}
                                        subtext={childjson[i].subtext}
                                        >
                                        {childjson[i].text}
                                    </Menu_Item>
                                }
                                />
                        );
                    } else {
                        childrencomonents.push(
                            <Menu_Item
                                key={i}
                                href={childjson[i].href}
                                subtext={childjson[i].subtext}
                                >
                                {childjson[i].text}
                            </Menu_Item>
                        );
                    }
                }
            }

            // Allow showing of children for non portal menus
            let children = (this.state.show) ? (
                <div style={style.main}>
                    {childrencomonents}
                </div>
            ) : '';

            let returnedMenu;
            if (this.props.portal) {
                returnedMenu = (
                    <Portal
                        trigger={this.props.trigger}
                        closeOnOutsideClick
                        noArrow
                        >
                        <div style={style.portal}>
                            {childrencomonents}
                        </div>
                    </Portal>
                );
            } else if (this.props.trigger) {
                returnedMenu = (
                    <div
                        style={style.trigger}
                        onMouseOver={() => {
                            if (!this.props.click) {
                                this.mouseEnter();
                            }
                        }}
                        onMouseLeave={() => {
                            if (!this.props.click) {
                                this.mouseLeave();
                            }
                        }}
                        onMouseDown={() => {
                            if (this.props.click) {
                                this.mouseEnter();
                            }
                        }}
                        >
                        {this.props.trigger}
                        {children}
                    </div>
                );
            } else {
                let orientation = this.props.orientation;
                returnedMenu = (<div>
                    {React.Children.map(this.props.children, (element, idx) => {
                        return React.cloneElement(element, { style: 'button', orientation });
                    })}
                </div>);
            }

            return returnedMenu;
        }
    };
};

import React from 'react';
import Pod_Styler from 'utility/styler.js';
import { Tabs_Trigger as TabTrigger } from 'utility/components.js';


module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    constructor(props, context) {
        super(props, context);

        this.state = {
            activeTab: props.activeTab,
        };
    }

    static propTypes = {
        children: React.PropTypes.any,
        activeTab: React.PropTypes.number,
    }

    setTab(key) {
        this.setState({
            activeTab: key,
        });
    }

    render() {
        const activeTab = this.state.activeTab;
        const style = Pod_Styler.getStyle(this);

        const triggers = [];

        let i = 0;
        const children = React.Children.map(this.props.children, child => {
            const key = i;
            const active = (key === activeTab);
            const boundClick = this.setTab.bind(this, i);

            triggers.push(
                <TabTrigger onClick={boundClick} key={'tabTrigger_' + key} target={key} active={active}>
                    {child.props.trigger}
                </TabTrigger>
            );

            const newChild = React.cloneElement(child, {
                key: 'tabPanel_' + i,
                reference: key,
                active,
            });

            i++;

            return newChild;
        });

        return (
            <div style={style.main}>
                <div style={style.triggers}>
                    {triggers}
                </div>
                <div style={style.panels}>
                    {children}
                </div>
            </div>
        );
    }

};

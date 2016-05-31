import React from 'react';
import Pod_Styler from 'utility/styler.js';

const TabTriggers = React.createClass({
    render() {
        return (
            <div style={this.props.style}>
                {this.props.children}
            </div>
        );
    },
});

const TabTrigger = React.createClass({
    render() {
        return (
            <div onClick={this.props.onClick} style={this.props.style}>
                {this.props.children}
            </div>
        );
    },
});

const TabPanels = React.createClass({
    render() {
        return (
            <div style={this.props.style}>
                {this.props.children}
            </div>
        );
    },
});

const TabPanel = React.createClass({
    render() {
        return (
            <div style={this.props.style}>
                {this.props.children}
            </div>
        );
    },
});


module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    constructor(props, context) {
        super(props, context);

        this.state = {
            activeTab: props.activeTab,
        };
    }

    setTab(key) {
        this.setState({
            activeTab: key,
        });
    }

    render() {
        const tabs = this.props.tabs || [];
        const activeTab = this.state.activeTab;
        const style = Pod_Styler.getStyle(this);

        return (
            <div style={style.main}>
                <TabTriggers style={style.triggers}>
                    {tabs.map((tab, i) => {
                        const key = tab.key || i;
                        const active = (key === activeTab);
                        const boundClick = this.setTab.bind(this, i);
                        const tabStyle = Pod_Styler.getStyle({}, {
                            styleLike: 'Tabs',
                            active,
                        });

                        return (
                            <TabTrigger onClick={boundClick} key={'tabTrigger_' + key} target={key} style={tabStyle.trigger}>
                                {tab.trigger}
                            </TabTrigger>
                        );
                    })}
                </TabTriggers>
                <TabPanels style={style.panels}>
                    {tabs.map((tab, i) => {
                        const key = tab.key || i;
                        const active = (key === activeTab);
                        const panelStyle = Pod_Styler.getStyle({}, {
                            styleLike: 'Tabs',
                            active,
                        });

                        return (
                            <TabPanel key={'tabPanel_' + i} reference={key} style={panelStyle.panel}>
                                {tab.content}
                            </TabPanel>
                        );
                    })}
                </TabPanels>
            </div>
        );
    }

};

/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React from 'react';
import Pod_Styler from 'utility/styler.js';
import PureRender from 'utility/pureRender.js';


import { Portal, Button } from 'utility/components.js';


const topButtonStyle = {
    display: 'inline-block',
    height: '2.5rem',
    lineHeight: '1.1rem',
    fontSize: '1.1rem',
    paddingLeft: '$gutter.small',
    paddingRight: '$gutter.small',
    margin: '$gutter.internal',
};

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    shouldComponentUpdate = PureRender;

    constructor(props, context) {
        super(props, context);

        this.state = {
            presets: props.presets,
        };
    }

    checkPresetConditions(index) {
        let checked = false;
        const preset = this.props.presets[index];
        const queries = this.props.queries;

        if (typeof(preset.addQuery) !== 'undefined') {
            let checkedAll = true;
            for (let i = 0, len = queries.length; i < len; i++) {
                const query = queries[i];
                for (let j = 0, len2 = preset.addQuery.length; j < len2; j++) {
                    const presetVal = preset.addQuery[j];
                    if (query.column === presetVal.column && query.comparison === presetVal.comparison && query.value === presetVal.value) {
                        checkedAll = false;
                    }
                }
            }
            if (checkedAll && queries.length > 0 && preset.addQuery.length > 0) checked = true;
        }

        if (typeof(preset.removeQuery) !== 'undefined') {
            let checkedAll = true;
            for (let i = 0, len = queries.length; i < len; i++) {
                const query = queries[i];
                for (let j = 0, len2 = preset.removeQuery.length; j < len2; j++) {
                    const presetVal = preset.removeQuery[j];
                    if (query.column === presetVal.column) {
                        checkedAll = false;
                    }
                }
            }
            if (checkedAll && queries.lenght > 0 && preset.removeQuery.length > 0) checked = true;
        }

        if (typeof(preset.addQueryOnePerColumn) !== 'undefined') {
            let checkedAll = true;
            for (let i = 0, len = queries.length; i < len; i++) {
                const query = queries[i];
                for (let j = 0, len2 = preset.addQueryOnePerColumn.length; j < len2; j++) {
                    const presetVal = preset.addQueryOnePerColumn[j];
                    if (query.column === presetVal.column && query.comparison === presetVal.comparison && query.value === presetVal.value) {
                        checkedAll = true;
                    }
                }
            }
            if (checkedAll && queries.length > 0 && preset.addQueryOnePerColumn.length > 0) checked = true;
        }

        return checked;
    }

    render() {
        const style = Pod_Styler.getStyle(this);

        const presets = this.state.presets;
        const queries = this.props.queries;
        const addQuery = this.props.addQuery;
        const removeQuery = this.props.removeQuery;
        const addQueryOnePerColumn = this.props.addQueryOnePerColumn;
        const presetButtons = presets.map(
            (preset, index) => {
                const onClick = () => {
                    if (typeof(preset.addQuery) !== 'undefined') {
                        for (let i = 0, len = preset.addQuery.length; i < len; i++) {
                            const query = preset.addQuery[i];
                            addQuery(query.column, query.comparison, query.value, query.display);
                        }
                    }

                    if (typeof(preset.removeQuery) !== 'undefined') {
                        for (let i = 0, len = preset.removeQuery.length; i < len; i++) {
                            const query = preset.removeQuery[i];
                            removeQuery(query.column);
                        }
                    }

                    if (typeof(preset.addQueryOnePerColumn) !== 'undefined') {
                        for (let i = 0, len = preset.addQueryOnePerColumn.length; i < len; i++) {
                            const query = preset.addQueryOnePerColumn[i];
                            addQueryOnePerColumn(query.column, query.comparison, query.value, query.display);
                        }
                    }
                };

                return (
                    <Button
                        key={'preset-' + index}
                        styler={{
                            kind: this.checkPresetConditions(index) === true ? 'primary' : 'base',
                            round: true,
                            style: topButtonStyle,
                        }}
                        onClick={onClick}
                    >
                        {preset.label}
                    </Button>
                );
            }
        );

        const presetContainer = (window.innerWidth > 800) ? presetButtons : <Portal trigger={<div>Presets</div>}><div>{presetButtons}</div></Portal>;

        return (
            <div style={{ display: 'inline-block' }}>
                {presetContainer}
            </div>
        );
    }
};

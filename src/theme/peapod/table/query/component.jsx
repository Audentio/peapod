/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React from 'react';
import Pod_Styler from 'utility/styler.js';
import PureRender from 'utility/pureRender.js';

import { Button, Icon, Grid, Div, Portal } from 'utility/components.js';


var topButtonStyle = {
    height: '2.5rem',
    lineHeight: '1.1rem',
    fontSize: '1.1rem',
    paddingLeft: '$gutter.small',
    paddingRight: '$gutter.small',
    margin: '$gutter.internal',
};

module.exports = function (componentName) {
    return class Pod_Component extends React.Component {

        static displayName = componentName;

        //shouldComponentUpdate = PureRender;

        render() {
            const style = Pod_Styler.getStyle(this);

            const queries = this.props.queries || [];
            const removeQuery = this.props.removeQuery || function() {};
            const noQueries = (queries.length === 0) ? <div>No Queries</div> : null;

            const content = queries.map(
                (query, i) => {
                    if (query.display === false) return '';

                    return (
                        <Div
                            key={'tableQuery_' + query.column + '_' + query.value}
                            styler={{
                                style: {
                                    display: 'block',
                                    borderBottomColor: '$table.color.controls.color',
                                    borderBottomWidth: '1px',
                                    borderBottomStyle: 'solid',
                                },
                            }}
                        >
                            <Button
                                styler={{
                                    kind: 'base',
                                    round: true,
                                    style: topButtonStyle,
                                }}
                            >
                                <Grid>
                                    <div>'{query.column}' {query.comparison} '{query.value}'</div>
                                    <Icon
                                        onClick={removeQuery.bind(null, i)}
                                        styler={{
                                            style: {
                                                color: '$color.text.white',
                                                marginLeft: '$gutter.internal',
                                            },
                                        }}
                                    >
                                        close
                                    </Icon>
                                </Grid>
                            </Button>
                        </Div>
                    );
                }
            );

            return (
                <Div styler={{ style: { display: 'inline-block' } }}>
                    <Portal
                        closeOnOutsideClick
                        noArrow
                        trigger={
                            <Icon
                                styler={{
                                    style: {
                                        height: '$table.headerHeight',
                                        fontSize: '$font.size.xxlarge',
                                        lineHeight: '$table.headerHeight',
                                        paddingLeft: '$gutter.extrasmall',
                                        paddingRight: '$gutter.extrasmall',
                                    },
                                }}
                            >
                                filter_list
                            </Icon>
                        }
                    >
                        <Div
                            styler={{
                                style: {
                                    backgroundColor: '$table.color.controls.background',
                                    borderTopColor: '$table.color.controls.color',
                                    borderTopWidth: '1px',
                                    borderTopStyle: 'solid',
                                },
                            }}
                        >
                            {content}
                            {noQueries}
                        </Div>
                    </Portal>
                </Div>
            );
        }
    };
};

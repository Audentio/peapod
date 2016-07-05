/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React from 'react';
import Pod_Styler from 'utility/styler.js';
import { AppContainer } from 'react-hot-loader';


module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    static propTypes = {
        children: React.PropTypes.any,
    }

    render() {
        const { styler, children, ...other } = this.props;

        return (
            <AppContainer>
                <div {...other} id="Peapod_Root">
                    {this.props.children}
                </div>
            </AppContainer>
        );
    }
};

/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


//Dependencies
import React from 'react';
import Pod_Styler from 'styler.js';
import Wrapper from 'wrapper.jsx';
import {Anchor} from 'components.js'

/**
* Breadcrumbs component
* @element Code
*/
class Breadcrumb extends React.Component {

    render() {
        var style = Pod_Styler.getStyle(this);

		var children = this.props.children;

		if (typeof children == "string") {
			children = this.props.childer.split('/')
		}

		var breadcrumbshtml = [];
		for (var i = 0; i < children.length; i++) {
			var seperator = (i + 1 != children.length) ? '/' : '';
			breadcrumbshtml.push(
                <li key={i} style={{display: 'inline'}}>
                	<Anchor styler={{style: style.listitem}}>{children[i]}</Anchor>
                	 {seperator}
               	</li>
            )
		}

        return (
            <ul style={style.main}>
                {breadcrumbshtml}
            </ul>
        );

    }

};

module.exports = Wrapper(Breadcrumb);

/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


//Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

var Pod_Styler = require('../styler.js');
var Wrapper = require('../wrapper.jsx')

/**
* Breadcrumbs component
* @element Code
*/
class Breadcrumbs extends React.Component {

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
                	<Pod.anchor styler={{style: style.listitem}}>{children[i]}</Pod.anchor>
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

module.exports = Wrapper(Breadcrumbs);

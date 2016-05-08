/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


//Dependencies
import React from 'react';
import Pod_Styler from 'styler.js';
import Wrapper from 'wrapper.jsx';


/**
* <Strong>
*
* @element Strong
*
*/
var Strong = React.createClass({

	render: function() {
		let style = Pod_Styler.getStyle(this);

		return (
			<strong style={[style.main, {fontWeight: 'bold'}]}>
                {this.props.children}
            </strong>
		)
	}

})

module.exports = Wrapper(Strong)

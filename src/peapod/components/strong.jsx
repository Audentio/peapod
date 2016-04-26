/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


//Dependencies
import React from 'react'
import ReactDOM from 'react-dom'

import Pod_Styler from '../styler.jsx'
import Wrapper from '../wrapper.jsx'


/**
* <Strong>
*
* @element Strong
*
*/
var Strong = React.createClass({

	render: function() {
		return (
			<strong style={[Pod_Styler.getStyle(this), {fontWeight: 'bold'}]}>
                {this.props.children}
            </strong>
		)
	}

})

module.exports = Wrapper(Strong)

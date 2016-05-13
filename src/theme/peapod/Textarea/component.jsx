/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

/* Dependencies */
import React from 'react'
import Pod_Styler from 'styler.js'
import {Input} from 'components'

/**
*
* Textarea description
*
*/
module.exports = class Textarea extends React.Component {

	render() {

		var style = Pod_Styler.getStyle(this)

		return (
			<Input {...this.props} type="textarea" />
		)

	}

}

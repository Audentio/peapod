/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

import React from 'react'
import Pod_Styler from 'styler.js'

/**
* HR component
*
* @element Pod_hr
*
*/
module.exports = class Hr extends React.Component {

    render() {
        const style = Pod_Styler.getStyle(this)
        return (
            <hr style={style.main} />
        )
    }

}

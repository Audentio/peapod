import React from 'react'
import ReactDOM from 'react-dom'
import Pod from 'components.js'

export default class Demo extends React.Component {

    render () {

        return(
            <div key={'demopage'}>
                <Pod.Heading>Hello World</Pod.Heading>
            </div>
        )

    }

}
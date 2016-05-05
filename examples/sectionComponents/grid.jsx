import React from 'react'
import ReactDOM from 'react-dom'
import 'components'
import Paragraph from 'components/paragraph'
import Strong from 'components/strong'
import Code from 'components/code'

export default class GridSection extends React.Component {

    render () {
        var imageStyle = {width:'200px',height:'200px'};
        return(
            <Pod.section key={'grid'}>
                <Pod.contentWrap>
                    <Pod.heading>Grid Example(Responsive)</Pod.heading>
                    <Pod.grid>
                        <Pod.gridCell styler={{sm:12, md:6, lg: 3}}>
                            <Pod.photo src="image.png" styler={{style:imageStyle}} hidpiData={[ ['1.5','@2x'], ['2','@3x'] ]} caption="pixelDensity > 2 : @3x" />
                        </Pod.gridCell>

                        <Pod.gridCell styler={{sm:12, md:6, lg: 3}}>
                            <Pod.photo src="image.png" styler={{style:imageStyle}} hidpiData={[ ['1.5','@2x'], ['2','@3x'] ]} caption="pixelDensity > 2 : @3x" />
                        </Pod.gridCell>
                        <Pod.gridCell styler={{sm:12, md:6, lg: 3}}>
                            <Pod.photo src="image.png" styler={{style:imageStyle}} hidpiData={[ ['1.5','@2x'], ['2','@3x'] ]} caption="pixelDensity > 2 : @3x" />
                        </Pod.gridCell>

                        <Pod.gridCell styler={{sm:12, md:6, lg: 3}}>
                            <Pod.photo src="image.png" styler={{style:imageStyle}} hidpiData={[ ['1.5','@2x'], ['2','@3x'] ]} caption="pixelDensity > 2 : @3x" />
                        </Pod.gridCell>
                    </Pod.grid>
                </Pod.contentWrap>
            </Pod.section>
        )
    }

}
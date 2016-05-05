import React from 'react'
import ReactDOM from 'react-dom'
import 'components'
import Paragraph from 'components/paragraph'
import Strong from 'components/strong'
import Code from 'components/code'

export default class PhotosSection extends React.Component {

    render () {
        var imageStyle = {width:'200px',height:'200px'};
        return (
            <Pod.section key={'photo'}>
                <Pod.contentWrap>

                    <Pod.heading>Photo</Pod.heading>
                    <Pod.photo src="image.png" styler={{style:imageStyle}} lightboxAnimation={false} caption="lightbox without animation" />
                    &nbsp;
                    <Pod.photo src="image.png" styler={{style:imageStyle}} lightbox={false} caption="lightbox disabled" hidpiData={[ ['1.5','-mySuffix'] ]} />
                    &nbsp;
                    <Pod.photo src="image.png" styler={{style:imageStyle}} hidpiData={[ ['1.5','@2x'], ['2','@3x'] ]} caption="pixelDensity > 2 : @3x" />
                    &nbsp;
                    <Pod.photo src="image.png" styler={{style:imageStyle}} alt="Default suffix" hidpiData={false} caption="HiDPI disabled" />

                </Pod.contentWrap>
            </Pod.section>
        )
    }

}
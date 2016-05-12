import React from 'react'
import Pod from 'components.js'

export default class PhotosSection extends React.Component {

    render () {
        var imageStyle = {width:'200px',height:'200px'};
        return (
            <Pod.Section key={'photo'}>
                <Pod.ContentWrap>

                    <Pod.Heading>Photo</Pod.Heading>
                    <Pod.Photo src="image.png" styler={{style:imageStyle}} lightboxAnimation={false} caption="lightbox without animation" />
                    &nbsp;
                    <Pod.Photo src="image.png" styler={{style:imageStyle}} lightbox={false} caption="lightbox disabled" hidpiData={[ ['1.5','-mySuffix'] ]} />
                    &nbsp;
                    <Pod.Photo src="image.png" styler={{style:imageStyle}} hidpiData={[ ['1.5','@2x'], ['2','@3x'] ]} caption="pixelDensity > 2 : @3x" />
                    &nbsp;
                    <Pod.Photo src="image.png" styler={{style:imageStyle}} alt="Default suffix" hidpiData={false} caption="HiDPI disabled" />

                </Pod.ContentWrap>
            </Pod.Section>
        )
    }

}

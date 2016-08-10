import React from 'react';
import { ContentWrap, Heading, Photo } from 'utility/components.js';

module.exports = class PhotoExample extends React.Component {

    render() {
        const imageStyle = { width: '200px', height: '200px' };
        return (
            <div>
                <ContentWrap>

                    <Heading>Photo</Heading>
                    <Photo src="image.png" styler={{ style: imageStyle }} lightboxAnimation={false} caption="lightbox without animation" />
                    &nbsp;
                    <Photo src="image.png" styler={{ style: imageStyle }} lightbox={false} caption="lightbox disabled" hidpiData={[['1.5', '-mySuffix']]} />
                    &nbsp;
                    <Photo src="image.png" styler={{ style: imageStyle }} hidpiData={[['1.5', '@2x'], ['2', '@3x']]} caption="pixelDensity > 2 : @3x" />
                    &nbsp;
                    <Photo src="image.png" styler={{ style: imageStyle }} alt="Default suffix" hidpiData={false} caption="HiDPI disabled" />

                </ContentWrap>
            </div>
        );
    }
}

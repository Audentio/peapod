import React from 'react';

import { Pane, Grid, Grid_Cell, Photo, Heading } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class GridExample extends React.Component {

    shouldComponentUpdate = PureRender;
    render() {
        const imageStyle = { width: '200px', height: '200px' };
        const imageStyleSmall = { width: '100px', height: '100px' };
        const gridStyle = {
            xs: 12,
            sm: 6,
            md: 4,
            lg: 3,
            style: {
                border: '1px solid #000',
            },
        };
        const gridStyleSmall = {
            xs: 12,
            sm: 6,
            md: 4,
            lg: 3,
            xl: 2,
            style: {
                border: '1px solid #000',
            },
        };

        return (
            <div>
                <Pane>
                    <Grid styler={{ style: { textAlign: 'center' } }}>
                        <Grid_Cell styler={gridStyle}>
                            <Photo src="image.png" styler={{ style: imageStyle }} hidpiData={[['1.5', '@2x'], ['2', '@3x']]} caption="pixelDensity > 2 : @3x" />
                        </Grid_Cell>

                        <Grid_Cell styler={gridStyle}>
                            <Pane>
                                <Heading>Nested Pane</Heading>

                                <Grid styler={{ style: { textAlign: 'center' } }}>
                                    <Grid_Cell styler={gridStyleSmall}>
                                        <Photo src="image.png" styler={{ style: imageStyleSmall }} hidpiData={[['1.5', '@2x'], ['2', '@3x']]} caption="pixelDensity > 2 : @3x" />
                                    </Grid_Cell>
                                    <Grid_Cell styler={gridStyleSmall}>
                                        <Photo src="image.png" styler={{ style: imageStyleSmall }} hidpiData={[['1.5', '@2x'], ['2', '@3x']]} caption="pixelDensity > 2 : @3x" />
                                    </Grid_Cell>
                                    <Grid_Cell styler={gridStyleSmall}>
                                        <Photo src="image.png" styler={{ style: imageStyleSmall }} hidpiData={[['1.5', '@2x'], ['2', '@3x']]} caption="pixelDensity > 2 : @3x" />
                                    </Grid_Cell>
                                    <Grid_Cell styler={gridStyleSmall}>
                                        <Photo src="image.png" styler={{ style: imageStyleSmall }} hidpiData={[['1.5', '@2x'], ['2', '@3x']]} caption="pixelDensity > 2 : @3x" />
                                    </Grid_Cell>
                                    <Grid_Cell styler={gridStyleSmall}>
                                        <Photo src="image.png" styler={{ style: imageStyleSmall }} hidpiData={[['1.5', '@2x'], ['2', '@3x']]} caption="pixelDensity > 2 : @3x" />
                                    </Grid_Cell>
                                    <Grid_Cell styler={gridStyleSmall}>
                                        <Photo src="image.png" styler={{ style: imageStyleSmall }} hidpiData={[['1.5', '@2x'], ['2', '@3x']]} caption="pixelDensity > 2 : @3x" />
                                    </Grid_Cell>
                                </Grid>
                            </Pane>
                        </Grid_Cell>

                        <Grid_Cell styler={gridStyle}>
                            <Photo src="image.png" styler={{ style: imageStyle }} hidpiData={[['1.5', '@2x'], ['2', '@3x']]} caption="pixelDensity > 2 : @3x" />
                        </Grid_Cell>

                        <Grid_Cell styler={gridStyle}>
                            <Pane>
                                <Heading>Nested Pane</Heading>

                                <Grid styler={{ style: { textAlign: 'center' } }}>
                                    <Grid_Cell styler={gridStyleSmall}>
                                        <Photo src="image.png" styler={{ style: imageStyleSmall }} hidpiData={[['1.5', '@2x'], ['2', '@3x']]} caption="pixelDensity > 2 : @3x" />
                                    </Grid_Cell>
                                    <Grid_Cell styler={gridStyleSmall}>
                                        <Photo src="image.png" styler={{ style: imageStyleSmall }} hidpiData={[['1.5', '@2x'], ['2', '@3x']]} caption="pixelDensity > 2 : @3x" />
                                    </Grid_Cell>
                                    <Grid_Cell styler={gridStyleSmall}>
                                        <Photo src="image.png" styler={{ style: imageStyleSmall }} hidpiData={[['1.5', '@2x'], ['2', '@3x']]} caption="pixelDensity > 2 : @3x" />
                                    </Grid_Cell>
                                    <Grid_Cell styler={gridStyleSmall}>
                                        <Photo src="image.png" styler={{ style: imageStyleSmall }} hidpiData={[['1.5', '@2x'], ['2', '@3x']]} caption="pixelDensity > 2 : @3x" />
                                    </Grid_Cell>
                                    <Grid_Cell styler={gridStyleSmall}>
                                        <Photo src="image.png" styler={{ style: imageStyleSmall }} hidpiData={[['1.5', '@2x'], ['2', '@3x']]} caption="pixelDensity > 2 : @3x" />
                                    </Grid_Cell>
                                    <Grid_Cell styler={gridStyleSmall}>
                                        <Photo src="image.png" styler={{ style: imageStyleSmall }} hidpiData={[['1.5', '@2x'], ['2', '@3x']]} caption="pixelDensity > 2 : @3x" />
                                    </Grid_Cell>
                                </Grid>
                            </Pane>
                        </Grid_Cell>
                    </Grid>
                </Pane>
            </div>
        );
    }
};

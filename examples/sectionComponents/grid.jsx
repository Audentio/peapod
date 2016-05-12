import React from 'react'
import ReactDOM from 'react-dom'

import {Section, Pane, ContentWrap, Grid, Grid_Cell, Photo, Heading} from 'components.js'

export default class GridSection extends React.Component {

	render () {
		var imageStyle = {width:'200px',height:'200px'};
		var imageStyleSmall = {width:'100px',height:'100px'};
		var gridStyle = {
			xs: 12,
			sm: 6,
			md: 4,
			lg: 3,
			style: {
				border: '1px solid #000'
			}
		}
		var gridStyleSmall = {
			xs: 12,
			sm: 6,
			md: 4,
			lg: 3,
			xl: 2,
			style: {
				border: '1px solid #000'
			}
		}

		return(
			<Section key={'grid'}>
				<Pane>
					<ContentWrap>
						<Heading>Grid Example(Responsive with Panes)</Heading>
					</ContentWrap>
					<Grid styler={{style: {textAlign: 'center'}}}>
						<Grid_Cell styler={gridStyle}>
							<Photo src="image.png" styler={{style:imageStyle}} hidpiData={[ ['1.5','@2x'], ['2','@3x'] ]} caption="pixelDensity > 2 : @3x" />
						</Grid_Cell>

						<Grid_Cell styler={gridStyle}>
							<Pane>
									<Heading>Nested Pane</Heading>

									<Grid styler={{style: {textAlign: 'center'}}}>
										<Grid_Cell styler={gridStyleSmall}>
											<Photo src="image.png" styler={{style:imageStyleSmall}} hidpiData={[ ['1.5','@2x'], ['2','@3x'] ]} caption="pixelDensity > 2 : @3x" />
										</Grid_Cell>

										<Grid_Cell styler={gridStyleSmall}>
											<Photo src="image.png" styler={{style:imageStyleSmall}} hidpiData={[ ['1.5','@2x'], ['2','@3x'] ]} caption="pixelDensity > 2 : @3x" />
										</Grid_Cell>
										<Grid_Cell styler={gridStyleSmall}>
											<Photo src="image.png" styler={{style:imageStyleSmall}} hidpiData={[ ['1.5','@2x'], ['2','@3x'] ]} caption="pixelDensity > 2 : @3x" />
										</Grid_Cell>

										<Grid_Cell styler={gridStyleSmall}>
											<Photo src="image.png" styler={{style:imageStyleSmall}} hidpiData={[ ['1.5','@2x'], ['2','@3x'] ]} caption="pixelDensity > 2 : @3x" />
										</Grid_Cell>

										<Grid_Cell styler={gridStyleSmall}>
											<Photo src="image.png" styler={{style:imageStyleSmall}} hidpiData={[ ['1.5','@2x'], ['2','@3x'] ]} caption="pixelDensity > 2 : @3x" />
										</Grid_Cell>

										<Grid_Cell styler={gridStyleSmall}>
											<Photo src="image.png" styler={{style:imageStyleSmall}} hidpiData={[ ['1.5','@2x'], ['2','@3x'] ]} caption="pixelDensity > 2 : @3x" />
										</Grid_Cell>
									</Grid>
							</Pane>
						</Grid_Cell>

						<Grid_Cell styler={gridStyle}>
							<Photo src="image.png" styler={{style:imageStyle}} hidpiData={[ ['1.5','@2x'], ['2','@3x'] ]} caption="pixelDensity > 2 : @3x" />
						</Grid_Cell>

						<Grid_Cell styler={gridStyle}>
							<Pane>
								<Heading>Nested Pane</Heading>

								<Grid styler={{style: {textAlign: 'center'}}}>
									<Grid_Cell styler={gridStyleSmall}>
										<Photo src="image.png" styler={{style:imageStyleSmall}} hidpiData={[ ['1.5','@2x'], ['2','@3x'] ]} caption="pixelDensity > 2 : @3x" />
									</Grid_Cell>

									<Grid_Cell styler={gridStyleSmall}>
										<Photo src="image.png" styler={{style:imageStyleSmall}} hidpiData={[ ['1.5','@2x'], ['2','@3x'] ]} caption="pixelDensity > 2 : @3x" />
									</Grid_Cell>
									<Grid_Cell styler={gridStyleSmall}>
										<Photo src="image.png" styler={{style:imageStyleSmall}} hidpiData={[ ['1.5','@2x'], ['2','@3x'] ]} caption="pixelDensity > 2 : @3x" />
									</Grid_Cell>

									<Grid_Cell styler={gridStyleSmall}>
										<Photo src="image.png" styler={{style:imageStyleSmall}} hidpiData={[ ['1.5','@2x'], ['2','@3x'] ]} caption="pixelDensity > 2 : @3x" />
									</Grid_Cell>

									<Grid_Cell styler={gridStyleSmall}>
										<Photo src="image.png" styler={{style:imageStyleSmall}} hidpiData={[ ['1.5','@2x'], ['2','@3x'] ]} caption="pixelDensity > 2 : @3x" />
									</Grid_Cell>

									<Grid_Cell styler={gridStyleSmall}>
										<Photo src="image.png" styler={{style:imageStyleSmall}} hidpiData={[ ['1.5','@2x'], ['2','@3x'] ]} caption="pixelDensity > 2 : @3x" />
									</Grid_Cell>
								</Grid>
							</Pane>
						</Grid_Cell>
					</Grid>
				</Pane>
			</Section>
		)
	}

}

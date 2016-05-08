import React from 'react'
import ReactDOM from 'react-dom'

import {Button} from 'components.js'

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

		return (<div><Button></Button></div>)

		/*
		return(
			<Pod.section key={'grid'}>
				<Pod.pane>
					<Pod.contentWrap>
						<Pod.heading>Grid Example(Responsive with Panes)</Pod.heading>
					</Pod.contentWrap>
					<Pod.grid styler={{style: {textAlign: 'center'}}}>
						<Pod.gridCell styler={gridStyle}>
							<Pod.photo src="image.png" styler={{style:imageStyle}} hidpiData={[ ['1.5','@2x'], ['2','@3x'] ]} caption="pixelDensity > 2 : @3x" />
						</Pod.gridCell>

						<Pod.gridCell styler={gridStyle}>
							<Pod.pane>
									<Pod.heading>Nested Pane</Pod.heading>

									<Pod.grid styler={{style: {textAlign: 'center'}}}>
										<Pod.gridCell styler={gridStyleSmall}>
											<Pod.photo src="image.png" styler={{style:imageStyleSmall}} hidpiData={[ ['1.5','@2x'], ['2','@3x'] ]} caption="pixelDensity > 2 : @3x" />
										</Pod.gridCell>

										<Pod.gridCell styler={gridStyleSmall}>
											<Pod.photo src="image.png" styler={{style:imageStyleSmall}} hidpiData={[ ['1.5','@2x'], ['2','@3x'] ]} caption="pixelDensity > 2 : @3x" />
										</Pod.gridCell>
										<Pod.gridCell styler={gridStyleSmall}>
											<Pod.photo src="image.png" styler={{style:imageStyleSmall}} hidpiData={[ ['1.5','@2x'], ['2','@3x'] ]} caption="pixelDensity > 2 : @3x" />
										</Pod.gridCell>

										<Pod.gridCell styler={gridStyleSmall}>
											<Pod.photo src="image.png" styler={{style:imageStyleSmall}} hidpiData={[ ['1.5','@2x'], ['2','@3x'] ]} caption="pixelDensity > 2 : @3x" />
										</Pod.gridCell>

										<Pod.gridCell styler={gridStyleSmall}>
											<Pod.photo src="image.png" styler={{style:imageStyleSmall}} hidpiData={[ ['1.5','@2x'], ['2','@3x'] ]} caption="pixelDensity > 2 : @3x" />
										</Pod.gridCell>

										<Pod.gridCell styler={gridStyleSmall}>
											<Pod.photo src="image.png" styler={{style:imageStyleSmall}} hidpiData={[ ['1.5','@2x'], ['2','@3x'] ]} caption="pixelDensity > 2 : @3x" />
										</Pod.gridCell>
									</Pod.grid>
							</Pod.pane>
						</Pod.gridCell>

						<Pod.gridCell styler={gridStyle}>
							<Pod.photo src="image.png" styler={{style:imageStyle}} hidpiData={[ ['1.5','@2x'], ['2','@3x'] ]} caption="pixelDensity > 2 : @3x" />
						</Pod.gridCell>

						<Pod.gridCell styler={gridStyle}>
							<Pod.pane>
								<Pod.heading>Nested Pane</Pod.heading>

								<Pod.grid styler={{style: {textAlign: 'center'}}}>
									<Pod.gridCell styler={gridStyleSmall}>
										<Pod.photo src="image.png" styler={{style:imageStyleSmall}} hidpiData={[ ['1.5','@2x'], ['2','@3x'] ]} caption="pixelDensity > 2 : @3x" />
									</Pod.gridCell>

									<Pod.gridCell styler={gridStyleSmall}>
										<Pod.photo src="image.png" styler={{style:imageStyleSmall}} hidpiData={[ ['1.5','@2x'], ['2','@3x'] ]} caption="pixelDensity > 2 : @3x" />
									</Pod.gridCell>
									<Pod.gridCell styler={gridStyleSmall}>
										<Pod.photo src="image.png" styler={{style:imageStyleSmall}} hidpiData={[ ['1.5','@2x'], ['2','@3x'] ]} caption="pixelDensity > 2 : @3x" />
									</Pod.gridCell>

									<Pod.gridCell styler={gridStyleSmall}>
										<Pod.photo src="image.png" styler={{style:imageStyleSmall}} hidpiData={[ ['1.5','@2x'], ['2','@3x'] ]} caption="pixelDensity > 2 : @3x" />
									</Pod.gridCell>

									<Pod.gridCell styler={gridStyleSmall}>
										<Pod.photo src="image.png" styler={{style:imageStyleSmall}} hidpiData={[ ['1.5','@2x'], ['2','@3x'] ]} caption="pixelDensity > 2 : @3x" />
									</Pod.gridCell>

									<Pod.gridCell styler={gridStyleSmall}>
										<Pod.photo src="image.png" styler={{style:imageStyleSmall}} hidpiData={[ ['1.5','@2x'], ['2','@3x'] ]} caption="pixelDensity > 2 : @3x" />
									</Pod.gridCell>
								</Pod.grid>
							</Pod.pane>
						</Pod.gridCell>
					</Pod.grid>
				</Pod.pane>
			</Pod.section>
		)
		*/
	}

}

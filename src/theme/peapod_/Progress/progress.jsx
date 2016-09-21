import React from 'react';
import { ContentWrap, Grid, Grid_Cell, Progress } from 'utility/components.js';
import Progressing from './example/progressing.jsx';
import ProgressExamples from './example/progress.jsx';


const rand = function (factor = 100) {
    return Math.floor(Math.random() * factor);
};

module.exports = class ProgressExample extends React.Component {
    render() {
        return (
            <div>
                <ContentWrap>

                    <ProgressExamples />

                    <br />

                    <p style={{ marginBottom: '8px' }}>Different strokes (styler prop)</p>
                    <Grid>
                        <Grid_Cell styler={{ lg: 6 }}>
                            <Progress styler={{ kind: 'info', stroke: 2 }} value={rand()} />
                            <Progress styler={{ kind: 'info', stroke: 8 }} value={rand()} />
                            <Progress styler={{ kind: 'info', stroke: 12 }} value={rand()} />
                        </Grid_Cell>

                        <Grid_Cell styler={{ lg: 6 }}>
                            <CircularProgress styler={{ kind: 'danger', stroke: 2, style: { marginLeft: 15 } }} value={rand()} />
                            <CircularProgress styler={{ kind: 'danger', stroke: 8, style: { marginLeft: 15 } }} value={rand()} />
                            <CircularProgress styler={{ kind: 'danger', stroke: 12, style: { marginLeft: 15 } }} value={rand()} />
                        </Grid_Cell>
                    </Grid>

                    <br />
                    <Progressing />
                    <br />

                    <p style={{ marginBottom: '8px' }}>Indeterminate (No props passed. value defaults to -1 which renders indeterminate progress)</p>
                    <Progress styler={{ kind: 'danger' }} />

                </ContentWrap>
            </div>
        );
    }
}

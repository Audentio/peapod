import React from 'react';
import Pod from 'utility/components.js';
import Progressing from './example/progressing.jsx';
import ProgressExamples from './example/progress.jsx';


const rand = function (factor = 100) {
    return Math.floor(Math.random() * factor);
};

module.exports = class ProgressExample extends React.Component {
    render() {
        return (
            <div>
                <Pod.ContentWrap>

                    <ProgressExamples />

                    <br />

                    <p style={{ marginBottom: '8px' }}>Different strokes (styler prop)</p>
                    <Pod.Grid>
                        <Pod.Grid_Cell styler={{ lg: 6 }}>
                            <Pod.Progress styler={{ kind: 'info', stroke: 2 }} value={rand()} />
                            <Pod.Progress styler={{ kind: 'info', stroke: 8 }} value={rand()} />
                            <Pod.Progress styler={{ kind: 'info', stroke: 12 }} value={rand()} />
                        </Pod.Grid_Cell>

                        <Pod.Grid_Cell styler={{ lg: 6 }}>
                            <Pod.CircularProgress styler={{ kind: 'danger', stroke: 2, style: { marginLeft: 15 } }} value={rand()} />
                            <Pod.CircularProgress styler={{ kind: 'danger', stroke: 8, style: { marginLeft: 15 } }} value={rand()} />
                            <Pod.CircularProgress styler={{ kind: 'danger', stroke: 12, style: { marginLeft: 15 } }} value={rand()} />
                        </Pod.Grid_Cell>
                    </Pod.Grid>

                    <br />
                    <Progressing />
                    <br />

                    <p style={{ marginBottom: '8px' }}>Indeterminate (No props passed. value defaults to -1 which renders indeterminate progress)</p>
                    <Pod.Progress styler={{ kind: 'danger' }} />

                </Pod.ContentWrap>
            </div>
        );
    }
}

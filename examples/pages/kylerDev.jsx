import React from 'react';
import Pod from 'components.js';

export default class KylerDev extends React.Component {
  render() {
    return (<div>
      <Pod.Pane>
        <Pod.Grid>
          <Pod.Grid_Cell styler={{ sm: 6, style: { height: '100vh' } }}>
            Test
          </Pod.Grid_Cell>
          <Pod.Grid_Cell styler={{ sm: 6, style: { height: '100vh' } }}>
            Test
          </Pod.Grid_Cell>
        </Pod.Grid>
      </Pod.Pane>
    </div>);
  }

}

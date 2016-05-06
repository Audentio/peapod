import React from 'react'
import { render, ReactDOM } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'

import _ from 'lodash'

import Sections from './sections.jsx'
import DamionDev from './developmentComponents/damionDev.jsx'
import KylerDev from './developmentComponents/damionDev.jsx'
import TusharDev from './developmentComponents/damionDev.jsx'


render((
  <Router history={browserHistory}>
    <Route path="/" component={Sections}></Route>
    <Route path="/damion" component={DamionDev}></Route>
    <Route path="/kyler" component={KylerDev}></Route>
    <Route path="/tushar" component={TusharDev}></Route>
  </Router>
), document.getElementById('mainContainer'))

// ReactDOM.render(<Sections />, document.getElementById('mainContainer'));

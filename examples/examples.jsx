import React from 'react'
import { render, ReactDOM } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'

import _ from 'lodash'

import Sections from './sections.jsx'

import DamionDev from './pages/damionDev.jsx'
import KylerDev from './pages/kylerDev.jsx'
import TusharDev from './pages/tusharDev.jsx'

import Demo from './pages/demo.jsx'

render((
  <Router history={browserHistory}>
    <Route path="/" component={Sections}></Route>
    <Route path="/damion" component={DamionDev}></Route>
    <Route path="/kyler" component={KylerDev}></Route>
    <Route path="/tushar" component={TusharDev}></Route>


    <Route path="/demo" component={Demo}></Route>
  </Router>
), document.getElementById('mainContainer'))

// ReactDOM.render(<Sections />, document.getElementById('mainContainer'));

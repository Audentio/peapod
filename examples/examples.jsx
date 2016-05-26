import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Perf from 'react-addons-perf';

import Sections from './sections.jsx';

import DamionDev from './pages/damionDev.jsx';
import KylerDev from './pages/kylerDev.jsx';
import TusharDev from './pages/tusharDev.jsx';

import Demo from './pages/demo.jsx';

Perf.start();
render((
    <Router history={browserHistory}>
        <Route path="/" component={Sections} />
        <Route path="/damion" component={DamionDev} />
        <Route path="/kyler" component={KylerDev} />
        <Route path="/tushar" component={TusharDev} />
        <Route path="/demo" component={Demo} />

        <Route path="/:componentName" component={Sections} />
    </Router>
), document.getElementById('mainContainer'));
Perf.stop();
Perf.printWasted();
Perf.printInclusive();
Perf.printExclusive();

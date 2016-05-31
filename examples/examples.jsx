import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Perf from 'react-addons-perf';

import { Root } from 'utility/components.js';

import Sections from './sections.jsx';

import DamionDev from './pages/damionDev.jsx';
import KylerDev from './pages/kylerDev.jsx';
import TusharDev from './pages/tusharDev.jsx';

import Demo from './pages/demo.jsx';

import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import fixedElems from './reducers';
import { addFixed } from './actions';

const store = createStore(fixedElems);


const measurePerf = true;

if (measurePerf) Perf.start();

render((
    <Provider store={store}>
        <Root>
            <Router history={browserHistory}>
                <Route path="/" component={Sections} />
                <Route path="/damion" component={DamionDev} />
                <Route path="/kyler" component={KylerDev} />
                <Route path="/tushar" component={TusharDev} />
                <Route path="/demo" component={Demo} />

                <Route path="/:componentName" component={Sections} />
            </Router>
        </Root>
    </Provider>
), document.getElementById('mainContainer'));

if (measurePerf) {
    Perf.stop();
    Perf.printWasted();
    Perf.printInclusive();
    Perf.printExclusive();
}


if (module.hot) {
    module.hot.accept();
}

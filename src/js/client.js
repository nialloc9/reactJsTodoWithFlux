import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, IndexRoute, hashHistory } from 'react-router';

//Routes
import Active from './pages/Active';
import Completed from './pages/Completed';
import Featured from './pages/Featured';
import Layout from './pages/Layout';

//get app entry point
const app = document.getElementById('app');

//render to the reactDOM which will render to actual DOM
ReactDOM.render(
    <Router history={ hashHistory }>
        <Route path='/' component={Layout}>
            <IndexRoute component={Featured}/>
            <Route path='/active' component={Active}></Route>
            <Route path='/completed' component={Completed}></Route>
        </Route>
    </Router>
    , app
)
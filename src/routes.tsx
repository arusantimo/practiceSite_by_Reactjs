import * as React from 'react'
import {
  Route,
  Redirect,
  Switch,
  Link
} from 'react-router-dom';
import Home from './container/Home';
import About from './container/About';
module.exports = (
  <div>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
    </ul>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Switch>
      <Redirect from="/home" to="/"/>
    </Switch>
  </div>
);
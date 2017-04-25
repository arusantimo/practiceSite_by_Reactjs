import * as React from "react";
import {
  BrowserRouter,
  HashRouter
 } from 'react-router-dom';
import Routes from './routes';
const Router:any = history.pushState ? BrowserRouter : HashRouter;
export default class App extends React.Component<any, any> {
  render() {
    return (
      <Router>
        <Routes/>
      </Router>
    );
  }
}
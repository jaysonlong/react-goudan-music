import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home'

function BasicLayout() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" component={Home}></Route>
      </Switch>
    </HashRouter>
  )
}

export default BasicLayout;
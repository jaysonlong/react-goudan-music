import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import BasicLayout from './pages/BasicLayout'

function BasicRoute() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" component={BasicLayout}></Route>
      </Switch>
    </HashRouter>
  )
}

export default BasicRoute;
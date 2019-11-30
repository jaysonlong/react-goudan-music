import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import TabBar from './TabBar/TabBar';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import PlayPane from './PlayPane/PlayPane';
import Player from '../components/Player';
import ListPane from './ListPane/ListPane';

let init = false;

const Home = ({ history }) => {
  if (!init) {
    init = true;
    history.replace(history.location.pathname);
  }

  return (
    <div>
      <Switch>
        <Route path="/playlist/:id" component={ListPane}></Route>
        <Route path="/">
          <Header />
          <TabBar />
        </Route>
      </Switch>

      <Footer />
      <PlayPane />
      <Player />
    </div>
  )
};

export default withRouter(Home);

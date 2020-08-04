import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import TabsPane from './TabsPane';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PlayPane from './PlayPane';
import ListPane from './ListPane';
import Player from '../components/Player';
import { connect } from 'dva';
import styles from './BasicLayout.less';

let init = false;

const BasicLayout = ({ history, showFooter }) => {
  const paddingBottom = showFooter ? "60px" : "0";

  if (!init) {
    init = true;
    history.replace(history.location.pathname);
  }

  return (
    <div className={styles.container} style={{ paddingBottom }}>
      <Switch>
        <Route path="/playlist/:id" component={ListPane}></Route>
        <Route path="/">
          <Header />
          <TabsPane />
        </Route>
      </Switch>

      <Footer />
      <PlayPane />
      <Player />
    </div>
  )
};

const mapState = ({ player }) => {
  return {
    showFooter: player.songInfo.id !== null,
  }
}

export default connect(mapState)(withRouter(BasicLayout));

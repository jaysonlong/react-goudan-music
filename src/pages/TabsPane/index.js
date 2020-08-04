import React from 'react';
import { Tabs } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import styles from './index.less'
import Recommend from './Recommend'
import TopList from './TopList'
import Search from './Search'
import { connect } from 'dva';

const TabsPane = ({ tabs, tabIndex, setTabIndex }) => {

  return (
    <div className={styles.container}>
      <Tabs tabs={tabs}
        initialPage={tabIndex}
        onChange={setTabIndex}
        renderTabBar={props => (
          <div className={styles.tab}>
            <Tabs.DefaultTabBar {...props} />
          </div>
        )}
        prerenderingSiblingsNumber={0}
        tabBarActiveTextColor={"#dd001b"}
        tabBarUnderlineStyle={{ border: '#dd001b solid 1px' }}
      >
        <Recommend key="/recommend" className={styles.content} />
        <TopList key="/toplist" className={styles.content} />
        <Search key="/search" className={styles.content} />
      </Tabs>
    </div>
  )
};

const mapState = ({ tabbar }) => {
  return {
    tabs: tabbar.tabs,
    tabIndex: tabbar.tabIndex,
  }
};

const mapDispatch = (dispatch) => {
  return {
    setTabIndex(_, tabIndex) {
      dispatch({
        type: 'tabbar/saveData',
        payload: { tabIndex }
      });
    },
  }
}

export default connect(mapState, mapDispatch)(withRouter(TabsPane));

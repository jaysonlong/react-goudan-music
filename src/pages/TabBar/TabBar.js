import React from 'react';
import { Tabs } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import styles from './TabBar.less'
import Recommend from './Recommend'
import Popular from './Popular'
import Search from './Search'
import { connect } from 'dva';

const TabBar = ({ inited, tabs }) => {
  const marginBottom = inited ? "60px" : "0";

  return (
    <div className={styles.container} style={{ marginBottom }}>
      <Tabs tabs={tabs}
        initialPage={0}
        renderTabBar={props => (
          <div className={styles.tab}>
            <Tabs.DefaultTabBar {...props} />
          </div>
        )}
        tabBarActiveTextColor={"#dd001b"}
        tabBarUnderlineStyle={{ border: '#dd001b solid 1px' }}
      >
        <Recommend key="/recommend" className={styles.content} />
        <Popular key="/popular" className={styles.content} />
        <Search key="/search" className={styles.content} />
      </Tabs>
    </div>
  )
};

const mapState = ({ player, tabs }) => {
  return {
    inited: player.id !== null,
    tabs,
  }
};

export default connect(mapState)(withRouter(TabBar));

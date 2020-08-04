import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd-mobile';
import styles from './Header.less'
import { withRouter } from 'react-router-dom';

const logo = require('../../../assets/logo/logo.png');

const Header = ({ history, collapse }) => {
  const onCollapse = () => {
    collapse();
    history.go(-2);
  }

  return (
    <div className={styles.header} onClick={onCollapse}>
      <Icon className={styles.down} type={'down'} />
      <div className={styles.center}>
        <span className={styles.logo}><img src={logo} alt="" /></span>
        <span className={styles.title}>狗蛋音乐</span>
      </div>
    </div>
  )
};

const mapDispatch = (dispatch) => {
  return {
    collapse() {
      dispatch({
        type: 'player/saveData',
        payload: {
          expanded: false
        }
      })
    }
  }
}

export default connect(null, mapDispatch)(withRouter(Header));
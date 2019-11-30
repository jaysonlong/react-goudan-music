import React from 'react';
import { Button } from 'antd-mobile';
import styles from './Header.less'

const Header = () => {
  const logo = require('../../assets/logo_reverse.png');
  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <img src={logo} className={styles.logo} alt="" />
        <span>狗蛋音乐</span>
      </div>
      <div>
        <Button inline className={styles.button}>下载APP</Button>
      </div>
    </div>
  )
};

export default Header
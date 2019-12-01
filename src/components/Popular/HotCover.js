import React from 'react';
import styles from './HotCover.less';
import { url2bgStyle, formatDate } from '../../utils/utils';

const url = require('../../assets/cover.png');

const HotCover = ({ updateTime }) => {
  // 2019/11/26
  return (
    <div className={styles.container}>
      <div className={styles.cover} style={url2bgStyle(url)}>
      </div>
      <div className={styles.uptime}>最近更新：{formatDate('YYYY/mm/dd', updateTime)}</div>
    </div>
  )
};

export default HotCover
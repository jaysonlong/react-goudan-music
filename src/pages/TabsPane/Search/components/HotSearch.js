import React from 'react';
import styles from './HotSearch.less';


const HotSearch = ({ data, onClick }) => (
  <div className={styles.container}>
    <div className={styles.title}>热门搜索</div>
    <div className={styles.tags}>
      {data.map((item, idx) => (
        <span key={idx} onClick={() => onClick(item)} className={styles.tag}>{item}</span>
      ))}
    </div>
  </div>
);

export default HotSearch
import React from 'react';
import styles from './CateTitle.less';

const CateTitle = ({ title, children }) => (
  <div className={styles.container}>
    <span className={styles.title}>{title}</span>
    <span className={styles.children}>{children}</span>
  </div>
);

export default CateTitle
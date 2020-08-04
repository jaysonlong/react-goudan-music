import React from 'react';
import Progress from './Progress'
import ControlBtn from './ControlBtn'
import styles from './ControlPane.less'


const ControlPane = () => {
  return (
    <div className={styles.container}>
      <Progress />
      <ControlBtn />
    </div>
  )
};

export default ControlPane
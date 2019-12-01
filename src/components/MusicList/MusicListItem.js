import React from 'react';
import { url2bgStyle } from '../../utils/utils';
import styles from './MusicListItem.less';


const coverUrl = require('../../assets/cover.png');

const MusciListItem = ({ data, rank, highlight, onClick }) => {
  const singerName = data.artists.map(each => each.name).join('/');
  const hasRank = rank !== undefined;

  let color = 'gray';
  if (hasRank && highlight && rank <= 3) {
    color = "red";
  }

  return (
    <div onClick={onClick} className={styles.item}>
      {hasRank &&
        <div className={styles.rank} style={{ color }}>
          {('' + rank).padStart(2, '0')}
        </div>
      }
      <div className={styles.content}>
        <div className={styles.name}>{data.name}</div>
        <div className={styles.desc}>
          <span className={styles.tag}>SQ</span>
          <span className={styles.singer}>{singerName}</span>
        </div>
      </div>
      <span className={styles.icon} style={url2bgStyle(coverUrl)}></span>
    </div>
  )
};


export default MusciListItem
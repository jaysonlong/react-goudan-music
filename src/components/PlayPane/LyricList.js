import React from 'react';
import styles from './LyricList.less'

const LyricList = ({ name, artists }) => {
  const lyrics = [
    { time: 1234, content: 'Hello, world' },
    { time: 1234, content: '是他，是他，就是他！' },
    { time: 1234, content: '我们的英雄，小哪吒！' },
  ]
  const artist = artists.map(each => each.name).join('/')
  return (
    <div className={styles.container}>
      <div className={styles.title}>{name}<span className={styles.artist}> - {artist}</span></div>
      <div className={styles.lyrics}>
        {lyrics.map((item, idx) => (
          <div key={idx} className={styles.lyric}>{item.content}</div>
        ))}
      </div>
    </div>
  )
};

export default LyricList
import React, { useEffect, useState } from 'react';
import BgHolder from '../../PlayPane/components/BgHolder';
import styles from './ListHeader.less'
import { Icon } from 'antd-mobile';

const headerHeight = 300;
const topBarHeight = 40;

const ListHeader = ({ name, playCount, creator, coverImgUrl, onClick }) => {
  const [topBar, setTopBar] = useState(null);

  useEffect(() => {
    if (!topBar) {
      return;
    }

    const container = topBar.parentNode.parentNode;
    container.onscroll = () => {
      const title = topBar && topBar.querySelector('span');
      const height = container.scrollTop;
      if (height >= headerHeight) {
        topBar.style.background = "rgb(212, 68, 57)";
      } else {
        topBar.style.background = `rgba(212, 68, 57, ${height / headerHeight})`;
        if (height > headerHeight - topBarHeight) {
          title.textContent = name;
        } else {
          title.textContent = '歌单详情';
        }
      }
    };
    return () => {
      container.onscroll = null;
    }
  })

  return (
    <div className={styles.header}>
      <div className={styles.topbar} ref={(el) => setTopBar(el)}>
        <div className={styles.goBack}>
          <Icon onClick={onClick} className={styles.left} type={'left'} />
          <span onClick={onClick}>歌单详情</span>
        </div>
      </div>
      <BgHolder className={styles.bg} src={coverImgUrl} color={"#aaa"}>
        <div className={styles.content}>
          <div className={styles.name}>{name}</div>
          <div>
            <span className={styles.playCount}>播放量: {parseInt(playCount).toLocaleString()}</span>
            <span className={styles.nickname}>By: {creator.nickname}</span>
          </div>
        </div>
      </BgHolder>
      {/* </div> */}
    </div>
  )
};

export default ListHeader;

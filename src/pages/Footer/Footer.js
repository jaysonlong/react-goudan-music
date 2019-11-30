import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'react-router-dom';
import styles from './Footer.less';

const Footer = ({ inited, name, artists, albumPicUrl,
  history, playing, expand, togglePlaying }) => {
  if (!inited) {
    return <div></div>;
  }

  const iconClass = ' iconfont ' + (playing ? 'icon-bofang' : 'icon-zanting');
  const artist = artists.map(each => each.name).join('/');

  return (
    <div className={styles.container} onClick={expand}>
      <img className={styles.album} src={albumPicUrl} alt="" />
      <div className={styles.info}>
        <div className={styles.song}>{name}</div>
        <div className={styles.singer}>{artist}</div>
      </div>
      <span onClick={togglePlaying} className={styles.play + iconClass}></span>
      <span className={styles.list + ' iconfont icon-liebiao'}></span>
    </div>
  )
};

const mapState = ({ player }) => {
  return {
    inited: player.id !== null,
    name: player.name,
    artists: player.artists,
    albumPicUrl: player.album.picUrl,
    playing: player.playing,
  }
}

const mapDispatch = (dispatch) => {
  return {
    expand() {
      dispatch({
        type: 'player/saveData',
        payload: {
          expanded: true
        }
      })
    },
    togglePlaying(ev) {
      ev.stopPropagation();
      dispatch({
        type: 'player/togglePlaying'
      })
    },
  }
}

export default connect(mapState, mapDispatch)(withRouter(Footer))
import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'react-router-dom';
import ImageHolder from './ImageHolder';
import styles from './Footer.less';

const Footer = ({ showFooter, name, artists, albumPicUrl,
  history, playing, playlistId, expand, togglePlaying }) => {
  if (!showFooter) {
    return <div></div>;
  }

  const iconClass = ' iconfont ' + (playing ? 'icon-bofang' : 'icon-zanting');
  const artist = artists.map(each => each.name).join('/');

  return (
    <div className={styles.container} onClick={expand}>
      <ImageHolder className={styles.album} src={albumPicUrl} />
      <div className={styles.info}>
        <div className={styles.song}>{name}</div>
        <div className={styles.singer}>{artist}</div>
      </div>
      <span onClick={togglePlaying} className={styles.play + iconClass}></span>
      <span className={styles.list + ' iconfont icon-liebiao'}></span>
    </div>
  )
};

const mapState = ({ player, playlist }) => {
  return {
    showFooter: player.songInfo.id !== null,
    name: player.songInfo.name,
    artists: player.songInfo.artists,
    albumPicUrl: player.album.picUrl,
    playing: player.playing,
    playlistId: playlist.id,
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
    togglePlaying(e) {
      e.stopPropagation();
      dispatch({
        type: 'player/togglePlaying'
      })
    },
  }
}

export default connect(mapState, mapDispatch)(withRouter(Footer))
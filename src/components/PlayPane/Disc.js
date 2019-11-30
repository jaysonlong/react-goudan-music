import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import ImageHolder from '../ImageHolder';
import styles from './Disc.less'
import { url2bgStyle } from '../../utils/utils';

const disc = require('../../assets/disc.png');
const discLight = require('../../assets/disc_light.png');
const distDefault = require('../../assets/default_disc.png');

const Disc = ({ playing, albumPicUrl, togglePlaying }) => {
  let [deg, setDeg] = useState(0);

  const discStyle = {
    backgroundImage: `url(${disc})`,
    transform: `rotate(${deg}deg)`
  }

  useEffect(() => {
    if (!playing) {
      return;
    }
    const timerId = setInterval(() => setDeg(deg => (deg + .6)), 50);
    return () => clearInterval(timerId);
  }, [playing])

  return (
    <div className={styles.container}>
      <div className={styles.disc} style={discStyle} onClick={togglePlaying}>
        <div className={styles.discLight} style={url2bgStyle(discLight)}>
          <ImageHolder className={styles.album} src={albumPicUrl} holder={distDefault} />
        </div>
      </div>
    </div>
  )
};

const mapState = ({ player }) => {
  return {
    playing: player.playing,
    albumPicUrl: player.album.picUrl
  }
}

const mapDispatch = (dispatch) => {
  return {
    togglePlaying() {
      dispatch({
        type: 'player/togglePlaying'
      })
    }
  }
}

export default connect(mapState, mapDispatch)(Disc)
import React from 'react';
import { connect } from 'dva';
import { url2bgStyle } from '../../utils/utils';
import styles from './ControlBtn.less'

const ControlBtn = ({ playing, togglePlaying }) => {
  const prev = require('../../assets/play_prev.png');
  const play = require('../../assets/play_play.png');
  const pause = require('../../assets/play_pause.png');
  const next = require('../../assets/play_next.png');

  const current = playing ? pause : play;

  return (
    <div className={styles.container}>
      <div className={styles.prev} style={url2bgStyle(prev)} ></div>
      <div onClick={togglePlaying} className={styles.play} style={url2bgStyle(current)}></div>
      <div className={styles.next} style={url2bgStyle(next)}></div>
    </div>
  )
};

const mapState = ({ player }) => {
  return {
    playing: player.playing
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

export default connect(mapState, mapDispatch)(ControlBtn);
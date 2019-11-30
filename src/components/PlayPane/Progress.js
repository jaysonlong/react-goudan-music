import React, { useState } from 'react';
import { connect } from 'dva';
import styles from './Progress.less'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { formatTime } from '../../utils/utils';

const Progress = ({ currentTime, duration, seekPercent }) => {
  const percent = Math.round(currentTime * 100 / duration);
  let [seeking, setSeeking] = useState(false);
  let [seekingPercent, setSeekingPercent] = useState(percent);

  const handleStyle = {
    backgroundColor: 'white',
    borderColor: 'white'
  };

  const onBeforeChange = (val) => {
    setSeeking(true);
    setSeekingPercent(val);
  }
  const onChange = (val) => {
    setSeekingPercent(val);
  }
  const onAfterChange = function (val) {
    setSeeking(false);
    seekPercent(val);
  }

  const diplayPercent = seeking ? seekingPercent : percent;
  const displayTime = seeking ? (diplayPercent * duration / 100) : currentTime;

  return (
    <div className={styles.container}>
      <span className={styles.current}>{formatTime(displayTime)}</span>
      <Slider className={styles.slider} max={100} value={diplayPercent}
        onAfterChange={onAfterChange} onChange={onChange} onBeforeChange={onBeforeChange}
        handleStyle={handleStyle} trackStyle={{ backgroundColor: 'rgb(199, 12, 12)' }} />
      <span className={styles.max}>{formatTime(duration)}</span>
    </div>
  )
};

const mapState = ({ player }) => {
  return {
    currentTime: player.currentTime,
    duration: player.duration,
  }
}

const mapDispatch = (dispatch) => {
  return {
    seekPercent(percent) {
      dispatch({
        type: 'player/seekPercent',
        payload: percent
      })
    }
  }
}

export default connect(mapState, mapDispatch)(Progress)
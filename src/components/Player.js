import React, { useEffect, useState } from 'react';
import { connect } from 'dva';

const Player = ({ songUrl, setEl, playing, setCurrentTime }) => {
  const [lel, setLEl] = useState(null);

  useEffect(() => {
    if (playing) {
      lel.paused && lel.play();
      const timer = setInterval(
        () => setCurrentTime(lel.currentTime * 1000), 1000
      );

      return () => {
        !lel.paused && lel.pause();
        clearInterval(timer);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing])

  return (
    <div>
      <audio
        src={songUrl}
        ref={el => {
          setEl(el);
          setLEl(el);
        }}
        loop
        style={{ display: 'none' }}
      ></audio>
    </div>
  )
}

const mapState = ({ player }) => {
  return {
    songUrl: player.songUrl,
    playing: player.playing,
  }
}

const mapDispatch = (dispatch) => {
  return {
    setEl(el) {
      window.el = el;
      dispatch({
        type: 'player/saveData',
        payload: {
          el: el
        }
      })
    },
    setCurrentTime(currentTime) {
      dispatch({
        type: 'player/saveData',
        payload: {
          currentTime: currentTime
        }
      })
    },
  }
}

export default connect(mapState, mapDispatch)(Player);
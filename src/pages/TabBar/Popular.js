import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import MusicList from '../../components/MusicList/MusicList';
import HotCover from '../../components/Popular/HotCover';

const Popular = ({ songs, updateTime, fetchSongs }) => {
  const [init] = useState();
  useEffect(() => {
    fetchSongs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [init])

  return (
    <div>
      <HotCover updateTime={updateTime}></HotCover>
      <MusicList data={songs} withRank={true} highlight={true} />
    </div>
  )
};

const mapState = ({ popular }) => {
  return {
    songs: popular.songs,
    updateTime: popular.updateTime,
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchSongs() {
      dispatch({
        type: 'popular/fetchSongs'
      })
    }
  }
}

export default connect(mapState, mapDispatch)(Popular);

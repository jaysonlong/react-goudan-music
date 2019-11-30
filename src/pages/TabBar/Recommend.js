import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'dva';
import PictureGrid from '../../components/Recommend/PictureGrid'
import CateTitle from '../../components/Recommend/CateTitle'
import MusicList from '../../components/MusicList/MusicList'

const Recommend = ({ history, newSongs, playlists, setList, fetchNewSongs, fetchPlayLists }) => {
  const [init] = useState();
  useEffect(() => {
    fetchPlayLists();
    fetchNewSongs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [init])

  const toList = (data) => {
    setList(data);
    history.push('/playlist/' + data.id);
  };

  return (
    <div>
      <CateTitle title="推荐歌单"></CateTitle>
      <PictureGrid onClick={toList} data={playlists} />
      <CateTitle title="最新音乐"></CateTitle>
      <MusicList data={newSongs} />
    </div>
  )
};

const mapState = ({ recommend }) => {
  return {
    newSongs: recommend.newSongs,
    playlists: recommend.playlists.slice(0, 9)
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchNewSongs() {
      dispatch({
        type: 'recommend/fetchNewSongs'
      })
    },
    fetchPlayLists() {
      dispatch({
        type: 'recommend/fetchPlayLists'
      })
    },
    setList(data) {
      dispatch({
        type: 'playlist/saveData',
        payload: data,
      })
    }
  }
}

export default connect(mapState, mapDispatch)(withRouter(Recommend));

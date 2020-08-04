import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'dva';
import PictureGrid from '../../../components/PictureGrid'
import CateTitle from './components/CateTitle'
import MusicList from '../../../components/MusicList'
import useInitialize from '../../../utils/internal'
import withScrollBar from '../../../components/withScrollBar'

const Recommend = ({ history, newSongs, playlists, setList, fetchNewSongs, fetchPlayLists, renew }) => {
  useInitialize(() => {
    fetchPlayLists();
    fetchNewSongs();
  });

  const toList = (data) => {
    setList(data);
    history.push('/playlist/' + data.id);
  };

  return (
    <div>
      <CateTitle title="推荐歌单">
        <span onClick={renew}>换一批</span>
      </CateTitle>
      <PictureGrid onClick={toList} data={playlists} />
      <CateTitle title="最新音乐"></CateTitle>
      <MusicList data={newSongs} />
    </div>
  )
};

const mapState = ({ recommend }) => {
  const { playlists, playlistsOffset: offset, playlistsLimit: limit } = recommend;
  let filterLists = playlists.slice(offset, offset + limit);

  const predLength = offset + limit - playlists.length;
  if (predLength > 0) {
    filterLists = filterLists.concat(playlists.slice(0, predLength))
  }

  return {
    newSongs: recommend.newSongs,
    playlists: filterLists,
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
    renew() {
      dispatch({
        type: 'recommend/renewPlaylists',
      })
    },
    setList(data) {
      dispatch({
        type: 'playlist/saveData',
        payload: data,
      })
    },
  }
}

export default connect(mapState, mapDispatch)(withScrollBar(withRouter(Recommend)));

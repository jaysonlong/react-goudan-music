import React from 'react';
import { useParams, withRouter } from 'react-router-dom'
import { connect } from 'dva';
import ListHeader from './components/ListHeader';
import ListBody from './components/ListBody';
import styles from './index.less';
import useInitialize from '../../utils/internal';
import withScrollBar from '../../components/withScrollBar'


const ListPane = ({ name, playCount, songCount, creator, songs,
  history, fetchPlayList, coverImgUrl }) => {
  const { id } = useParams();
  useInitialize(() => fetchPlayList(id));

  const ListWithScrollBar = withScrollBar(() => (
    <>
      <ListHeader name={name} playCount={playCount} onClick={history.goBack}
        creator={creator} coverImgUrl={coverImgUrl} />
      <ListBody songCount={songCount} songs={songs} />
    </>
  ));

  return (
    <div className={styles.container}>
      <ListWithScrollBar />
    </div>
  )
};

const mapState = ({ playlist }) => {
  return {
    id: playlist.id,
    name: playlist.name,
    creator: playlist.creator,
    playCount: playlist.playCount,
    shareCount: playlist.shareCount,
    songCount: playlist.songCount,
    songs: playlist.songs,
    songIds: playlist.songIds,
    coverImgUrl: playlist.coverImgUrl,
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchPlayList(id) {
      dispatch({
        type: 'playlist/fetchPlayList',
        payload: id,
      })
    },
  }
}

export default connect(mapState, mapDispatch)(withRouter(ListPane));

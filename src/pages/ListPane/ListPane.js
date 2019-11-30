import React, { useState, useEffect } from 'react';
import { useParams, withRouter } from 'react-router-dom'
import { connect } from 'dva';
import ListHeader from '../../components/ListPane/ListHeader';
import ListBody from '../../components/ListPane/ListBody';


const ListPane = ({ inited, name, playCount, songCount, creator, songs,
  history, fetchPlayList, coverImgUrl }) => {

  const { id } = useParams();

  const [init] = useState();
  useEffect(() => {
    fetchPlayList(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [init])

  return (
    <div>
      <ListHeader name={name} playCount={playCount} onClick={history.goBack}
        creator={creator} coverImgUrl={coverImgUrl} />
      <ListBody inited={inited} songCount={songCount} songs={songs} />
    </div>
  )
};

const mapState = ({ playlist, player }) => {
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
    inited: player.id !== null,
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

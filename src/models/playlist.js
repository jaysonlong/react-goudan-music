import { queryPlayList, querySongDetail } from '../services/api';

export default {

  namespace: 'playlist',

  state: {},

  effects: {
    * fetchPlayList({ payload: id }, { call, put }) {

      yield put({
        type: "saveData",
        payload: {
          id,
          loading: true,
        }
      })

      const playlistInfo = yield call(queryPlayList, id);
      yield put({
        type: "saveData",
        payload: {
          ...playlistInfo,
          loading: false,
        }
      });

      const { songIds, songs } = playlistInfo;
      if (songIds.length === songs.length) {
        return;
      }

      const resetSongIds = songIds.slice(songs.length).map(each => each.id);
      const restSongs = yield call(querySongDetail, resetSongIds);
      yield put({
        type: "appendSongs",
        payload: restSongs,
      });
    }
  },

  reducers: {
    saveData(state, { payload: data }) {
      const {
        id = state.id,
        name = state.name,
        creator = state.creator,
        playCount = state.playCount,
        shareCount = state.shareCount,
        songCount = state.songCount,
        songs = state.songs,
        songIds = state.songIds,
        coverImgUrl = state.coverImgUrl,
        loading = state.loading,
      } = data;

      return Object.assign({}, state, {
        id,
        name,
        creator,
        playCount,
        shareCount,
        songCount,
        songs,
        songIds,
        coverImgUrl,
        loading,
      })
    },

    appendSongs(state, { payload: data }) {
      const songs = state.songs.concat(data);
      return Object.assign({}, state, {
        songs,
      })
    },
  },

}
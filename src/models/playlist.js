import { queryPlayList } from '../services/api';

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

      const playlist = yield call(queryPlayList, id);
      const {
        name,
        creator,
        playCount,
        shareCount,
        songCount,
        songs,
        songIds,
        coverImgUrl,
      } = playlist;

      yield put({
        type: "saveData",
        payload: {
          id,
          name,
          creator,
          playCount,
          shareCount,
          songCount,
          songs,
          songIds,
          coverImgUrl,
          loading: false,
        }
      })
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
  },

}
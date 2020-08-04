import { queryRecommendNewSongs, queryRecommendPlayLists } from '../services/api';

export default {

  namespace: 'recommend',

  state: {},

  effects: {
    * fetchNewSongs(action, { call, put }) {
      const newSongs = yield call(queryRecommendNewSongs);
      yield put({
        type: "saveData",
        payload: { newSongs }
      })
    },
    * fetchPlayLists(action, { call, put }) {
      const playlists = yield call(queryRecommendPlayLists, 72);
      yield put({
        type: "saveData",
        payload: { playlists }
      })
    }
  },

  reducers: {
    // 处理 "换一批歌单" 请求
    renewPlaylists(state) {
      const total = state.playlists.length;
      const playlistsOffset = (state.playlistsOffset + state.playlistsLimit) % total;
      return Object.assign({}, state, {
        playlistsOffset,
      })
    },
    saveData(state, { payload: data }) {
      const {
        newSongs = state.newSongs,
        playlists = state.playlists,
        playlistsOffset = state.playlistsOffset,
      } = data;

      return Object.assign({}, state, {
        newSongs,
        playlists,
        playlistsOffset,
      })
    },
  },

}
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
      const playlists = yield call(queryRecommendPlayLists);
      yield put({
        type: "saveData",
        payload: { playlists }
      })
    }
  },

  reducers: {
    saveData(state, { payload: data }) {
      const {
        newSongs = state.newSongs,
        playlists = state.playlists
      } = data;

      return Object.assign({}, state, {
        newSongs,
        playlists,
      })
    },
  },

}
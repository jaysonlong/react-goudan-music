import { queryPopularSongs } from '../services/api';

export default {

  namespace: 'popular',

  state: {},

  effects: {
    * fetchSongs(action, { call, put }) {
      const data = yield call(queryPopularSongs);
      const {
        updateTime,
        songCount,
        songs,
        songIds,
      } = data;

      yield put({
        type: "saveData",
        payload: {
          updateTime,
          songs,
          songIds,
          songCount,
        }
      })
    }
  },

  reducers: {
    saveData(state, { payload: data }) {
      const {
        updateTime = state.updateTime,
        songs = state.songs,
        songIds = state.songIds,
        songCount = state.songCount,
      } = data;
      return Object.assign({}, state, {
        updateTime,
        songs,
        songIds,
        songCount,
      })
    },
  },

}
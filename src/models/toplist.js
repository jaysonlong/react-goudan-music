import { queryTopLists } from '../services/api';

export default {

  namespace: 'toplist',

  state: {},

  effects: {
    * fetchTopLists(action, { call, put }) {
      const toplists = yield call(queryTopLists);

      yield put({
        type: "saveData",
        payload: {
          toplists,
        }
      })
    }
  },

  reducers: {
    saveData(state, { payload: data }) {
      const {
        toplists = state.toplists,
      } = data;
      return Object.assign({}, state, {
        toplists,
      })
    },
  },

}
import { queryHotSearch, querySearchSuggest, querySearchResult, storageKey } from '../services/api'
import { setStorage } from '../utils/utils'
import _ from 'lodash';

export default {

  namespace: 'search',

  state: {},

  effects: {
    * fetchHotSearch(action, { call, put }) {
      const hotSearch = yield call(queryHotSearch);

      yield put({
        type: "saveData",
        payload: { hotSearch }
      })
    },

    * fetchSuggest({ payload: keyword }, { call, put }) {
      keyword = keyword.trim();
      yield put({
        type: "saveData",
        payload: { keyword }
      })

      if (keyword === '') {
        return;
      }

      const suggest = yield call(querySearchSuggest, keyword);

      yield put({
        type: "saveData",
        payload: { suggest }
      })
    },

    * fetchResult({ payload: keyword }, { call, put }) {
      if ((keyword = keyword.trim()) === '') {
        return;
      }

      yield put({
        type: "saveData",
        payload: {
          searching: true,
          keyword,
        }
      })

      yield put({
        type: 'addHistoryItem',
        payload: keyword,
      })

      const result = yield call(querySearchResult, keyword);

      yield put({
        type: "saveData",
        payload: {
          result,
          searching: false,
        }
      })
    },
  },

  reducers: {
    addHistoryItem(state, { payload: historyItem }) {
      if ((historyItem = historyItem.trim()) === '') {
        return state;
      }

      let history = [historyItem].concat(state.history);
      history = _.uniq(history)
      setStorage(storageKey, history);

      return Object.assign({}, state, {
        history: history
      })
    },

    removeHistoryItem(state, { payload: historyItem }) {
      if ((historyItem = historyItem.trim()) === '') {
        return state;
      }

      const history = state.history.filter(each => each !== historyItem);
      setStorage(storageKey, history);

      return Object.assign({}, state, {
        history: history
      })
    },

    saveData(state, { payload: data }) {
      const {
        hotSearch = state.hotSearch,
        suggest = state.suggest,
        keyword = state.keyword,
        searching = state.searching,
        result = state.result,
        history = state.history,
      } = data;

      if (data.history !== undefined) {
        setStorage(storageKey, history);
      }

      return Object.assign({}, state, {
        hotSearch,
        suggest,
        keyword: keyword.trim(),
        searching,
        result,
        history,
      })
    },
  },

}

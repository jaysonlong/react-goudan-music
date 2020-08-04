
export default {

  namespace: 'tabbar',

  state: {},

  reducers: {
    saveData(state, { payload: data }) {
      const {
        tabIndex = state.tabIndex,
      } = data;

      return Object.assign({}, state, {
        tabIndex,
      })
    },
  }
}
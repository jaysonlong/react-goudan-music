import { querySongUrl, queryAlbumInfo } from '../services/api';
import { Toast } from 'antd-mobile';

export default {

  namespace: 'player',

  state: {},

  effects: {
    * playSong({ payload: song }, { call, put }) {
      const { id, name, artists, album, duration } = song;

      yield put({
        type: "saveData",
        payload: {
          playing: false,
          loading: true,
        }
      });

      const songInfo = yield call(querySongUrl, id);
      if (!songInfo.url) {
        Toast.offline("亲爱的, 暂无版权", 1);
        return;
      }

      yield put({
        type: "saveData",
        payload: {
          id,
          duration,
          name,
          artists,
          songUrl: songInfo.url,
          playing: true,
          expanded: true,
          loading: false,
        }
      });

      let { id: albumId, picUrl } = album;

      if (!picUrl) {
        const albumInfo = yield call(queryAlbumInfo, albumId);
        picUrl = albumInfo.picUrl;
      }

      yield put({
        type: "saveData",
        payload: {
          album: {
            id: albumId,
            picUrl,
          }
        }
      });
    },
  },

  reducers: {
    togglePlaying(state) {
      if (state.playing === false && !state.songUrl) {
        return state;
      }

      return Object.assign({}, state, {
        playing: !state.playing,
      });
    },
    seekPercent(state, { payload: percent }) {
      if (percent < 0 || percent > 100) {
        return state;
      }
      const currentTime = Math.round(state.duration * percent / 100);
      state.el.currentTime = currentTime / 1000;
      return Object.assign({}, state, {
        currentTime: currentTime,
      });
    },
    saveData(state, { payload: data }) {
      const {
        id = state.id,
        name = state.name,
        artists = state.artists,
        album = state.album,
        duration = state.duration,
        songUrl = state.songUrl,

        el = state.el,
        playing = state.playing,
        loading = state.loading,
        expanded = state.expanded,
        currentTime = state.currentTime,
      } = data;

      if (playing === true && !songUrl) {
        return state;
      }

      return Object.assign({}, state, {
        id,
        name,
        artists,
        album,
        duration,
        songUrl,

        el,
        playing,
        loading,
        expanded,
        currentTime,
      });
    }
  },
}
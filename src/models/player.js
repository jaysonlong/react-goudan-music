import { querySongUrl, queryAlbumInfo } from '../services/api';
import { Toast } from 'antd-mobile';

export default {

  namespace: 'player',

  state: {},

  effects: {
    * playSong({ payload }, { call, put }) {
      const { songInfo, songList } = payload;

      yield put({
        type: "saveData",
        payload: {
          songList: songList,
          playing: false,
          loading: true,
        }
      });

      const result = yield call(querySongUrl, songInfo.id);
      if (!result.url) {
        Toast.offline("亲爱的, 暂无版权", 1);
        return;
      }

      yield put({
        type: "saveData",
        payload: {
          songInfo: {
            id: songInfo.id,
            duration: songInfo.duration,
            name: songInfo.name,
            artists: songInfo.artists,
            songUrl: result.url,
          },
          playing: true,
          loading: false,
          expanded: true,
        }
      });

      let { id: albumId, picUrl } = songInfo.album;

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
      if (state.playing === false && !state.songInfo.songUrl) {
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
      const currentTime = Math.round(state.songInfo.duration * percent / 100);
      state.el.currentTime = currentTime / 1000;
      return Object.assign({}, state, {
        currentTime: currentTime,
      });
    },
    saveData(state, { payload: data }) {
      const {
        songInfo = state.songInfo,
        album = state.album,
        songList = state.songList,
        el = state.el,
        playing = state.playing,
        loading = state.loading,
        expanded = state.expanded,
        currentTime = state.currentTime,
      } = data;

      if (playing === true && !songInfo.songUrl) {
        return state;
      }

      return Object.assign({}, state, {
        songInfo,
        album,
        songList,
        el,
        playing,
        loading,
        expanded,
        currentTime,
      });
    }
  },
}
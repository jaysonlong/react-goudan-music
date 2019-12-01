import dva from 'dva';
import FastClick from 'fastclick';
import './global.css';
import './assets/iconfont/iconfont.css';
import MyRouter from './router';
import { getStorage } from './utils/utils';
import { storageKey } from './services/api';

FastClick.attach(window.document.body);

const app = dva({
  initialState: {
    // 推荐页面
    recommend: {
      playlists: [],
      newSongs: [],
      playlistsOffset: 0,
      playlistsLimit: 9,
    },

    // 热歌榜
    popular: {
      updateTime: 0,
      songs: [],
      songIds: [],
      songCount: 0,
    },

    // 搜索页面
    search: {
      hotSearch: [],
      suggest: [],
      searching: false,
      keyword: '',
      result: [],
      history: getStorage(storageKey, []),
    },

    // 播放页面
    player: {
      id: null,
      name: '',
      artists: [],
      album: {
        picUrl: '',
      },
      duration: 0,
      songUrl: '',

      el: null,
      playing: false,
      loading: false,
      expanded: false,
      currentTime: 0,
    },

    // 顶部标签栏
    tabs: [
      { key: '/recommend', title: '推荐音乐' },
      { key: '/popular', title: '热歌榜' },
      { key: '/search', title: '搜索' },
    ],

    // 歌单详情页
    playlist: {
      id: null,
      name: '',
      creator: {},
      playCount: 0,
      shareCount: 0,
      songCount: 0,
      songs: [],
      songIds: [],
      coverImgUrl: '',
      loading: false,
    }
  }
});
app.router(MyRouter);
app.model(require('./models/recommend').default);
app.model(require('./models/popular').default);
app.model(require('./models/search').default);
app.model(require('./models/player').default);
app.model(require('./models/tabs').default);
app.model(require('./models/playlist').default);
app.start('#root');


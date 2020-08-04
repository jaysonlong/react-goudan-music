import dva from 'dva';
import FastClick from 'fastclick';
import './global.less';
import './assets/iconfont/iconfont.css';
import BasicRoute from './router';
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

    // 排行榜
    toplist: {
      toplists: [],
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
      songInfo: {
        id: null,
        name: '',
        artists: [],
        duration: 0,
        songUrl: '',
      },
      album: {
        picUrl: '',
      },
      songList: [],

      el: null,
      playing: false,
      loading: false,
      expanded: false,
      currentTime: 0,
    },

    // 顶部标签栏
    tabbar: {
      tabs: [
        { key: '/recommend', title: '推荐音乐' },
        { key: '/toplist', title: '排行榜' },
        { key: '/search', title: '搜索' },
      ],
      tabIndex: 0,
    },

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
app.router(BasicRoute);
app.model(require('./models/tabbar').default);
app.model(require('./models/recommend').default);
app.model(require('./models/toplist').default);
app.model(require('./models/search').default);
app.model(require('./models/player').default);
app.model(require('./models/playlist').default);
app.start('#root');


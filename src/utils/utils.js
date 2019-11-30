import _ from 'lodash';

export function url2bgStyle(url) {
  return {
    backgroundImage: `url(${url})`
  }
}

export function formatTime(microtime) {
  const time = parseInt(microtime / 1000);

  let div = Math.floor(time / 60) || 0;
  let mod = time % 60 || 0;
  div = div > 9 ? div : '0' + div;
  mod = mod > 9 ? mod : '0' + mod;

  return div + ':' + mod;
}

export function formatDate(pattern, date) {
  if (!(date instanceof Date)) {
    date = parseInt(date);

    if (isNaN(date)) {
      return '';
    } else {
      date = new Date(date);
    }
  }

  let ret;
  let opt = {
    "Y+": date.getFullYear().toString(),        // 年
    "m+": (date.getMonth() + 1).toString(),     // 月
    "d+": date.getDate().toString(),            // 日
    "H+": date.getHours().toString(),           // 时
    "i+": date.getMinutes().toString(),         // 分
    "s+": date.getSeconds().toString()          // 秒
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(pattern);
    if (ret) {
      pattern = pattern.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    };
  };
  return pattern;
}

export function getStorage(key, defaultVal) {
  try {
    const value = window.localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  } catch (e) { }

  return _.cloneDeep(defaultVal);
}

export function setStorage(key, data) {
  window.localStorage.setItem(key, JSON.stringify(data));
}

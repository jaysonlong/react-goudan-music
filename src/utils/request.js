import { fetch } from 'dva';
import { Toast } from 'antd-mobile';
import hash from 'hash.js';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  Toast.offline(`请求错误 ${response.status}: ${response.url},${errortext}`);
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
};

// 缓存到 sessionStorage
const cachedSave = (response, hashcode) => {
  const contentType = response.headers.get('Content-Type');

  if (contentType && contentType.match(/application\/json/i)) {
    response
      .clone()
      .text()
      .then(content => {
        sessionStorage.setItem(hashcode, content);
        sessionStorage.setItem(`${hashcode}:timestamp`, Date.now());
      });
  }
  return response;
};

// 从 sessionStorage 读取缓存 (如果未过期)
const cachedGet = (expirys, hashcode) => {
  const cached = sessionStorage.getItem(hashcode);
  const whenCached = sessionStorage.getItem(`${hashcode}:timestamp`);

  if (cached !== null && whenCached !== null) {
    const age = (Date.now() - whenCached) / 1000;

    if (age < expirys) {
      const response = new Response(new Blob([cached]));
      return response.json();
    }
    sessionStorage.removeItem(hashcode);
    sessionStorage.removeItem(`${hashcode}:timestamp`);
  }
  return null;
}

// 开发坏境延长缓存时间10分钟，方便测试
const defaultExpirys = process.env.NODE_ENV === 'development' ? 60 * 5 : 60;

/**
 * 请求工具类，设置缓存，失败时显示报错信息
 * options.expirys设置过期信息，如 70 或 true (取默认值)，以秒计
 * @param {url} url 
 * @param {options} options
 */
export default function request(url, options) {
  options = {
    expirys: true,
    ...options,
  };

  const fingerprint = url + (options.body ? JSON.stringify(options.body) : '');
  const hashcode = hash
    .sha256()
    .update(fingerprint)
    .digest('hex');

  const expirys = options.expirys && defaultExpirys;
  if (expirys !== false) {
    const jsonResp = cachedGet(expirys, hashcode)
    if (jsonResp !== null) {
      return jsonResp;
    }
  }

  return fetch(url, options)
    .then(checkStatus)
    .then(response => cachedSave(response, hashcode))
    .then(response => response.json())
    .catch(err => (console.log(err) || err));
}

# react-goudan-music

##### 狗蛋音乐 —— 使用 React 实现的仿网易云音乐播放器

##### 在线演示：[Demo地址](http://jaysonl.top/goudan-music/)

> 项目纯属娱乐，用来熟悉一下React开发相关技术栈
>

| ![recommend](img/recommend.jpg) |  ![toplist](img/toplist.jpg)  |  ![search](img/search.jpg)   |
| ------------------------------- | ---- | ---- |
| ![result](img/result.jpg)  |  ![listpane](img/listpane.jpg)  |  ![playpane](img/playpane.jpg)  |



**项目概况**：

- 基础技术栈： `react` + `antd-mobile` + `react-router` + `redux` + `redux-saga`
- 基于 `create-react-app` 创建，使用 `dva` 管理
- 半成品，能用，但目前只有基本的搜索/播放/歌单/排行榜功能
- 自己摸索着一点点写的， 没有参考任何教程，代码/结构可能不太规范

**Todo：**

- 歌词显示
- 无限下拉列表
- 图片懒加载
- `antd-mobile` 换成 `antd` 或者其他UI



## 🔨 Usage

### 服务器部署(docker)

#### 准备项目

```bash
git clone https://github.com/jaysonlong/react-goudan-music.git
cd react-goudan-music

sudo docker build -t jaysonlong/react-goudan-music .
sudo docker network create goudan-music
```

#### 使用 docker compose (V2) 启动/停止

```bash
# 启动容器，监听80端口
sudo docker compose up -d

# 或指定监听端口
sudo PORT=8080 docker compose up -d

# 停止容器
sudo docker compose stop
```

#### 访问页面

浏览器访问 http://localhost

### 本地测试(nodejs V16)

#### 前端服务

```bash
git clone https://github.com/jaysonlong/react-goudan-music.git
cd react-goudan-music

npm install
npm start
```

#### 后端服务

后端项目为 [@Binaryify](https://github.com/Binaryify/NeteaseCloudMusicApi) 提供的 [网易云音乐 API](https://github.com/Binaryify/NeteaseCloudMusicApi)，感谢。

```bash
git clone https://github.com/Binaryify/NeteaseCloudMusicApi.git
cd reNeteaseCloudMusicApi

npm install
node app.js
```

#### 访问页面

浏览器访问 http://localhost

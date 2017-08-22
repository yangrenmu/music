# music app

* [API来源](https://github.com/Binaryify/NeteaseCloudMusicApi)，感谢[@Binaryify](https://github.com/Binaryify)的网易音乐的接口，这些接口是在本地node的环境中使用，为了可以在线访问，将这些API部署到了[leancloud](https://leancloud.cn/products/)上面。

[接口文档](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e8%8e%b7%e5%8f%96%e9%9f%b3%e4%b9%90-url)
，使用时，将接口地址前加上 http://musicapi.leanapp.cn 即可。

如：获取音乐 url

接口地址为：/music/url?id=347230，

这样使用： http://musicapi.leanapp.cn/music/url?id=347230，可以得到歌曲的 URL 信息

# 演示
　　[在线演示](http://yangrenmu.github.io/music/#/recommends)

　　扫描下方二维码 ，可以在移动端进行浏览
<div align="left">
　　<img src="http://upload-images.jianshu.io/upload_images/4928722-9f21b31389eea606.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"/>
</div>


## 安装

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 项目技术
 * vue：项目中主要运用了 vue.js 框架，轻量，易上手。
 * vuex：vue 的状态管理插件，便于 vue 各组件之间的通信。
 * vue-router：vue 的路由插件。
 * vue-axios：项目中主要用来请求数据。
 * swiper：触屏焦点图、触屏Tab切换、触屏多图切换插件。
 * better-scroll：固定高度内滚动插件。

# 项目截图
　　<p>项目中的部分功能</p>
<div>
<img width="40%" src="http://upload-images.jianshu.io/upload_images/4928722-6d389941ebee70e6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"/> 　　　
<img width="40%" src="http://upload-images.jianshu.io/upload_images/4928722-f6d63f394112596c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"/>
</div>
<br>
<div>
<img width="40%" src="http://upload-images.jianshu.io/upload_images/4928722-e05f250cf4bce6a0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"/>　　　
<img width="40%" src="http://upload-images.jianshu.io/upload_images/4928722-a30cb8f31007b7ce.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"/>
</div>

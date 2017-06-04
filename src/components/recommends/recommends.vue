<template>
  <div class="recommends">
    <div class="menu-wrapper" ref="recommendScroll">
      <div class="recommends-content">
        <swiper></swiper>
        <div :class="{'lazy': imgLoad}">
          <div class="cover"></div>
        </div>
        <div class="song-wrapper">
          <div class="recommend">
            <span class="recommendMusic">推荐歌单</span>
            <i class="icon-exceed"></i>
          </div>
          <div class="music-list">
            <ul>
              <li class="cover-wrapper" v-for="item in music" @click="showMusicMenu(item, $event)">
                <img ref="img" @load="load" :src="item.coverImgUrl" class="image" >
                <div class="icon">
                  <i class="icon-headset"></i>
                  <span class="count">{{item.playCount | itemPlayCount}}</span>
                </div>
                <div class="text-wrapper">
                  <span class="text">{{item.name}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="exclusive-wrapper">
          <div class="exclusive">
            <span class="text">独家放送</span>
            <i class="icon-exceed"></i>
          </div>
          <div class="cover-wrapper">
            <div class="content-top">
              <div class="content">
                <img class="image" src="../../../static/image/only0.jpg">
                <span class="text">总有一些过往要到后来才会恍然大悟</span>
                <i class="icon-dynamicPlay"></i>
              </div>
              <div class="content">
                <img class="image" src="../../../static/image/only1.jpg">
                <span class="text">麦粒终回归！Miley Cyrus 强势新单 Malibu 超清 mv首播！</span>
                <i class="icon-dynamicPlay"></i>
              </div>
            </div>
            <div class="content-bottom">
              <img class="image" src="../../../static/image/only2.jpg">
              <span class="text">燃烧内心摇滚宇宙</span>
              <i class="icon-dynamicPlay"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <musicMenu ref="musicMenu"></musicMenu>
  </div>
</template>
<script type="text/javascript">
import swiper from '../swiper/swiper';
import musicApi from '../../musicApi/index.js';
import musicMenu from '../musicMenu/musicMenu';
import BScroll from 'better-scroll';
export default {
  data: function() {
    return {
      music: {},
      imgLoad: true
    };
  },
  // 过滤器格式化文本
  filters: {
    itemPlayCount(val) {
      if (val < 10000) {
        return val;
      } else {
        return (val / 10000).toFixed(0) + '万';
      }
    }
  },
  // 在 DOM 生成前获取 music 数据
  created() {
    // this.getMusic();
    // http://musicapi.duapp.com/api.php?type=topPlayList&cat=%E5%85%A8%E9%83%A8&offset=0&limit=5
    this.axios.get(musicApi.getPlayListByWhere('全部', 'hot', 10, true, 6)).then((res) => {
      this.music = res.data.playlists;
      this.$nextTick(() => {
        this._initScroll();
      });
    });
    // var jsonp = require('jsonp');
    // let url = 'http://music.163.com/api/playlist/list?cat=全部&order=hot&offset=0&limit=50';
    // jsonp('http://music.163.com/api/playlist/list?cat=全部&order=hot&offset=0&limit=50', null, function(err, data) {
    //   JSON.parse(data);
    //   console.log(data);
    // });
  },
  methods: {
    showMusicMenu(item, event) {
      if (!event._constructed) {
        return;
      }
      this.$refs.musicMenu.show(item);
      this.$store.commit('setMusicInfo', item);
      this.$store.commit('setCurrentIndex', -1);
    },
    _initScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.recommendScroll, {
          click: true
        });
      } else {
        // 重新计算滚动区域
        this.scroll.refresh();
      }
    },
    load() {
      this.imgLoad = false;
      this.scroll.refresh();
    }
  },
  components: {
    swiper,
    musicMenu
  }
};
</script>
<style lang="scss" type="text/css">
@import '../../common/css/mixin.scss';
.recommends {
  .menu-wrapper {
    position: absolute;
    top: 66px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .recommends-content {
      @include keyframes(rotateOne) {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      .lazy {
        position: fixed;
        top: 66px;
        left: 0px;
        width: 100%;
        height: 100%;
        background: #fff;
        z-index: 40;
        .cover {
          width: 100px;
          height: 100px;
          margin: 20% auto;
          background: url('../../../static/image/loading.png') no-repeat;
          background-size: cover;
          animation: rotateOne 5s linear infinite;
        }
      }
      .song-wrapper {
        position: relative;
        margin-bottom: 8px;
        font-size: 0px;
        .recommend {
          position: relative;
          width: 100%;
          height: 30px;
          line-height: 30px;
          .recommendMusic {
            padding: 0 0px 0 6px;
            font-size: 12px;
            border-left: 2px solid rgb(240, 20, 20);
          }
          .icon-exceed {
            position: absolute;
            top: 1px;
            left: 56px;
            font-size: 16px;
          }
        }
        .music-list {
          font-size: 10px;
          width: 100%;
          .cover-wrapper {
            display: inline-block;
            position: relative;
            vertical-align: top;
            padding: 0 0 10px;
            width: 33.33%;
            box-sizing: border-box;
            &:nth-child(3n + 2) {
              position: relative;
              &:before,
              &:after {
                content: '';
                position: absolute;
                height: 100%;
                width: 1px;
                background: #fff;
              }
              &:before {
                top: 0;
                left: 0;
              }
              &:after {
                top: 0;
                right: 0px;
              }
            }
            .image {
              width: 100%;
            }
            .icon {
              position: absolute;
              top: 0px;
              right: 0px;
              width: 100%;
              padding: 2px 2px 0 0;
              color: #fff;
              text-align: right;
              background: rgba(100, 100, 100, 0.1);
              .icon-headset {
                &:before {
                  font-size: 10px;
                }
              }
              .count {
                font: 12px;
              }
            }
            .text-wrapper {
              padding: 2px 4px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              font-size: 12px;
              text-align: left;
              .text {
                height: 16px;
                line-height: 16px;
              }
            }
          }
        }
      }
      .exclusive-wrapper {
        font-size: 0;
        .exclusive {
          position: relative;
          width: 100%;
          height: 30px;
          line-height: 30px;
          .text {
            vertical-align: top;
            padding: 0 2px 0 6px;
            font-size: 12px;
            border-left: 2px solid rgb(240, 20, 20);
          }
          .icon-exceed {
            position: absolute;
            top: 1px;
            left: 56px;
            font-size: 16px;
          }
        }
        .cover-wrapper {
          .content-top {
            display: flex;
            .content {
              position: relative;
              flex: 1;
              &:last-child {
                &:before {
                  position: absolute;
                  content: '';
                  height: 100%;
                  width: 1px;
                  top: 0;
                  left: 0;
                  background: #fff;
                }
              }
              .image {
                width: 100%;
              }
              .text {
                display: inline-block;
                margin-bottom: 10px;
                padding: 2px 4px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                height: 30px;
                text-align: left;
                line-height: 16px;
                font-size: 12px;
              }
              .icon-dynamicPlay {
                position: absolute;
                top: 4px;
                left: 4px;
                transform: rotate(90deg);
                font-size: 10px;
                color: #fff;
                border: 1px solid #fff;
                border-radius: 50%;
              }
            }
          }
          .content-bottom {
            position: relative;
            .image {
              width: 100%;
            }
            .text {
              display: inline-block;
              margin-bottom: 10px;
              padding: 2px 5px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              height: 30px;
              text-align: left;
              line-height: 16px;
              font-size: 12px;
            }
            .icon-dynamicPlay {
              position: absolute;
              top: 4px;
              left: 4px;
              transform: rotate(90deg);
              font-size: 10px;
              color: #fff;
              border: 1px solid #fff;
              border-radius: 50%;
            }
          }
        }
      }
    }
  }
}
</style>

<template>
  <transition name="fade">
    <div v-show="showFlag" class="musicMenu">
      <div class="musicMenu-content">
        <div class="top">
          <div class="icon" :style="{background: activeColor}" style="transition: opacity .1s;">
            <i class="icon-back" @click="back"></i>
            <span class="text">{{topContent}}</span>
          </div>
        </div>
        <div :class="{'bottom': bottom}" class="musicList-wrapper" ref="musicScroll">
          <div class="musicList-content">
            <div class="music-header">
              <div class="mask">
              </div>
              <div class="background-image">
                <img class="image" :src="musicInfo.coverImgUrl">
              </div>
              <div class="cover-wrapper">
                <div class="cover">
                  <img class="image" :src="musicInfo.coverImgUrl">
                  <div class="icon">
                    <i class="icon-headset"></i>
                    <span class="count">{{musicInfo.playCount | itemPlayCount}}</span>
                  </div>
                </div>
                <div class="cover-info">
                  <div class="infoName">
                    <span class="text">{{musicInfo.name}}</span>
                  </div>
                  <div class="user">
                    <img class="user-avatar" :src="musicInfo.creator.avatarUrl">
                    <span class="user-name">{{musicInfo.creator.nickname}}</span>
                    <i class="icon-exceed"></i>
                  </div>
                </div>
              </div>
              <div class="collect-wrapper">
                <div class="collect bottom">
                  <i class="icon-collect icon"></i>
                  <span class="text">{{musicInfo.subscribedCount}}</span>
                </div>
                <div class="discuss bottom">
                  <i class="icon-comment icon"></i>
                  <span class="text">{{musicInfo.commentCount}}</span>
                </div>
                <div class="share bottom">
                  <i class="icon-share icon"></i>
                  <span class="text">{{musicInfo.shareCount}}</span>
                </div>
                <div class="download bottom">
                  <i class="icon-download icon"></i>
                  <span class="text">下载</span>
                </div>
              </div>
            </div>
            <div class="music-list">
              <div class="play-all">
                <div class="play-left">
                  <i class="icon-pause"></i>
                  <span class="text">播放全部</span>
                  <span class="total">(共{{musicInfo.trackCount}}首)</span>
                </div>
                <div class="play-right">
                  <i class="icon-choices"></i>
                  <span class="text">多选</span>
                </div>
              </div>
              <div class="list-wrapper">
                <ul>
                  <li v-for="(item, index) in musicList" :class="{'playing': (index === currentIndex)}" class="list-item">
                    <div class="single">
                      <div class="number">
                        <span class="text">{{index + 1}}</span>
                      </div>
                      <div class="musicName" @click="showMiniPlay(item, $event, index)">
                        <div class="name">
                          <span class="music">{{item.name}}</span>
                          <span :class="{'playing': (index === currentIndex)}" class="singer">{{item.ar[0].name}}-{{item.name}}</span>
                        </div>
                        <i class="icon-omit"></i>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <miniPlay ref="miniPlay"></miniPlay>
    </div>
  </transition>
</template>
<script type="text/javascript">
import musicApi from '../../musicApi/index.js';
import BScroll from 'better-scroll';
// import musicPlay from '../musicPlay/musicPlay';
import miniPlay from '../miniPlay/miniPlay';
import {
  mapGetters
} from 'vuex';
export default {
  data: function() {
    return {
      showFlag: false,
      bottom: false,
      scrollY: '',
      topContent: '歌单',
      musicList: {},
      opacity: ''
    };
  },
  computed: {
    ...mapGetters([
      // 映射 this.musicInfo 为 store.getters.musicInfo，便于使用watch检测
      'musicInfo',
      'currentIndex'
    ]),
    activeColor() {
      return 'rgba(200, 40, 40, ' + this.opacity + ')';
    }
  },
  filters: {
    itemPlayCount(val) {
      if (val < 10000) {
        return val;
      } else {
        return (val / 10000).toFixed(0) + '万';
      }
    }
  },
  methods: {
    show(item) {
      this.showFlag = true;
      this.get(item);
    },
    back() {
      this.showFlag = false;
    },
    get(item) {
      // http://p1.music.126.net/vuPDRsBSPjjRUG2D_CGngw==/109951162933606208.jpg
      // http://p1.music.126.net/4TYHavK0-_I5xP56S-mZMw==/86861418607019.jpg
      // https://api.imjad.cn/cloudmusic/?type=playlist&id=733287371
      this.axios.get(musicApi.getPlayListDetail(item.id)).then((res) => {
        this.musicList = res.data.playlist.tracks;
        this.$store.commit('setMusicList', this.musicList);
        this.$nextTick(() => {
          this._initScroll();
        });
      });
    },
    _initScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.musicScroll, {
          // 实时获取滚动位置
          probeType: 3,
          click: true
        });
        this.scroll.on('scroll', (position) => {
          this.scrollY = Math.abs(Math.floor(position.y));
          // console.log(this.scrollY);
          if (this.scrollY < 45) {
            this.topContent = '歌单';
          } else {
            this.topContent = this.musicInfo.name;
          }
          if (this.scrollY < 210) {
            this.opacity = (this.scrollY / 210).toFixed(2);
          } else {
            this.opacity = 1;
          }
        });
      } else {
        // 重新计算滚动区域
        this.scroll.refresh();
      }
    },
    showMiniPlay(item, event, index) {
      if (!event._constructed) {
        return;
      }
      this.$refs.miniPlay.show(item);
      this.bottom = true;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
      this.$store.commit('setSingleMusic', item);
      this.$store.commit('setCurrentIndex', index);
    }
  },
  components: {
    // musicPlay,
    miniPlay
  }
};
</script>
<style lang="scss" type="text/css">
@import '../../common/css/mixin.scss';
.musicMenu {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 30;
  width: 100%;
  height: 100%;
  background: #fff;
  &.fade-enter-active,
  &.fade-leave-active {
    transition: all .3s ease-out;
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  &.fade-enter,
  &.fade-leave-active {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  .musicMenu-content {
    .top {
      .icon {
        position: absolute;
        display: flex;
        width: 100%;
        height: 40px;
        line-height: 40px;
        z-index: 2;
        .icon-back {
          display: inline-block;
          flex: 0 0 40px;
          width: 40px;
          font-size: 12px;
          color: #fff;
          text-align: center;
        }
        .text {
          display: inline-block;
          flex: 1;
          margin-right: 40px;
          white-space: nowrap;
          overflow: hidden;
          font-size: 16px;
          color: #fff;
        }
      }
    }
    .musicList-wrapper {
      position: absolute;
      top: 0px;
      bottom: 0;
      left: 0;
      width: 100%;
      overflow: hidden;
      &.bottom {
        bottom: 45px;
      }
      .music-header {
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: -2;
        }
        .background-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          z-index: -1;
          filter: blur(30px);
          .image {
            width: 100%;
          }
        }
        .cover-wrapper {
          display: flex;
          margin: 40px 0 14px;
          width: 100%;
          .cover {
            position: relative;
            flex: 0 0 120px;
            margin-left: 10px;
            width: 120px;
            .image {
              width: 100%;
              vertical-align: bottom;
              border-radius: 1px;
            }
            .icon {
              position: absolute;
              top: 0px;
              right: 0px;
              width: 100%;
              padding: 2px 2px 0 0;
              color: #fff;
              text-align: right;
              font-size: 10px;
              background: rgba(150, 150, 150, 0.1);
              .icon-headset {
                font-size: 10px;
              }
              .count {
                font-size: 12px;
              }
            }
          }
          .cover-info {
            flex: 1;
            padding: 10px;
            .infoName {
              margin-bottom: 30px;
              width: 100%;
              .text {
                font-size: 14px;
                line-height: 16px;
                color: #fff;
              }
            }
            .user {
              display: inline-block;
              width: 100%;
              height: 28px;
              line-height: 28px;
              font-size: 0;
              .user-avatar {
                display: inline-block;
                width: 28px;
                border-radius: 50%;
              }
              .user-name {
                display: inline-block;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 178px;
                vertical-align: top;
                margin-left: 5px;
                font-size: 12px;
                color: #fff;
                @media only screen and (max-width: 374px) {
                  max-width: 120px;
                }
              }
              .icon-exceed {
                display: inline-block;
                vertical-align: top;
                margin-top: 2px;
                color: #fff;
              }
            }
          }
        }
        .collect-wrapper {
          display: flex;
          margin-bottom: 10px;
          .bottom {
            flex: 1;
            color: #fff;
            .icon {
              display: block;
              padding: 2px;
              text-align: center;
              font-size: 14px;
            }
            .text {
              display: block;
              text-align: center;
              font-size: 12px;
            }
          }
        }
      }
      .music-list {
        position: relative;
        overflow: hidden;
        .play-all {
          height: 40px;
          line-height: 40px;
          font-size: 0;
          overflow: hidden;
          @include border-1px(rgb(220, 220, 220));
          .play-left {
            float: left;
            .icon-pause {
              padding: 0 10px;
              font-size: 14px;
            }
            .text {
              font-size: 12px;
            }
            .total {
              font-size: 9px;
              color: #949494;
            }
          }
          .play-right {
            float: right;
            padding-right: 10px;
            .icon-choices {
              padding: 0 5px;
              font-size: 14px;
            }
            .text {
              display: inline-block;
              font-size: 12px;
            }
          }
        }
        .list-wrapper {
          font-size: 10px;
          .list-item {
            &:last-child {
              .single {
                .musicName {
                  @include border-none;
                  margin-bottom: 0;
                }
              }
            }
            &.playing {
              color: rgb(220, 20, 20);
            }
            .single {
              display: flex;
              height: 45px;
              .number {
                flex: 0 0 35px;
                width: 35px;
                text-align: center;
                line-height: 45px;                
              }
              .musicName {
                flex: 1;
                display: inline-flex;
                font-size: 0;
                @include border-1px(rgb(220, 220, 220));
                .name {
                  flex: 1;
                  display: inline-block;
                  .music {
                    display: inline-block;
                    max-width: 290px;
                    height: 25px;
                    line-height: 25px;
                    white-space: nowrap;
                    font-size: 12px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    @media only screen and (max-width: 374px) {
                      max-width: 239px;
                    }
                  }
                  .singer {
                    display: block;
                    max-width: 290px;
                    padding-top: 1px;
                    height: 20px;
                    box-sizing: border-box;
                    white-space: nowrap;
                    font-size: 10px;
                    color: #949494;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    @media only screen and (max-width: 374px) {
                      max-width: 239px;
                    }
                    &.playing {
                      color: rgb(220, 20, 20);
                    }
                  }
                }
                .icon-omit {
                  flex: 0 0 45px;
                  float: right;
                  width: 45px;
                  height: 100%;
                  line-height: 45px;
                  text-align: center;
                  transform: rotate(90deg);
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>

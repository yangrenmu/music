<template>
  <div class="fade">
    <transition name="fade">
      <div class="musicPlay" v-show="showFlag">
        <div class="musicPlay-content">
          <div class="background">
            <div class="mask"></div>
            <div class="image-wrapper">
              <!-- <img class="image" :src="singleMusic.al.picUrl"> -->
              <img class="image" :src="singleMusicUrl">
            </div>
          </div>
          <div class="title">
            <div class="icon" @click="back">
              <i class="icon-back"></i>
            </div>
            <div class="musicInfo">
              <span class="name">{{singleMusic.name}}</span>
              <span class="singer">{{singleMusic.ar[0].name}}</span>
              <i class="icon-share"></i>
            </div>
          </div>
          <div class="jukebox">
            <div class="record-wrapper">
              <img :class="{'microphonePlay': microphonePlay}" class="microphone" src="../../../static/image/microphone.png">
              <div class="record-content">
                <div class="record"></div>
                <img :class="{'cover-pause': coverPause, 'coverAfresh': coverAfresh}" class="cover" :src="singleMusicUrl">
              </div>
            </div>
          </div>
          <div class="play-wrapper">
            <div class="icon-wrapper">
              <i class="icon-enshrine"></i>
              <i class="icon-download"></i>
              <i class="icon-comment"></i>
              <i class="icon-omit"></i>
            </div>
            <div class="progress">
              <span class="time">{{currentTime}}</span>
              <div @click="controlBar" class="line">
                <span ref="totalBar" class="totalBar"></span>
                <span ref="currentBar" class="currentBar"></span>
                <span ref="dot" class="dot"></span>
              </div>
              <span class="time">{{totalTime}}</span>
            </div>
            <div class="control-wrapper">
              <i class="icon-circulation"></i>
              <div class="control">
                <i @click="playPre" class="icon-pre icon"></i>
                <i @click="play" :class="{'icon-play': togglePlay, 'icon-pause': !togglePlay}" class="icon"></i>
                <i @click="playNext" class="icon-next icon"></i>
              </div>
              <i class="icon-list"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <audio ref="audio" @timeupdate="getTimes" :src="music.url" id="audio"></audio>
  </div>
</template>
<script type="text/javascript">
import musicApi from '../../musicApi/index';
import {
  mapGetters
} from 'vuex';
const TRUE = 1;
const TOGGLE = 0;
export default {
  data: function() {
    return {
      showFlag: false,
      microphonePlay: false,
      coverPause: false,
      coverAfresh: false,
      music: '',
      currentTime: '00:00'
    };
  },
  computed: {
    ...mapGetters([
      'singleMusic',
      'musicList',
      'currentIndex',
      'togglePlay'
    ]),
    totalTime() {
      let time = Math.round((this.music.size * 8) / this.music.br);
      let munite = this.addZero(Math.floor(time / 60));
      let second = this.addZero(time % 60);
      return munite + ':' + second;
    },
    singleMusicUrl() {
      // 将 https 替换为 http
      let picUrl = this.singleMusic.al.picUrl;
      return picUrl.replace(/https/, 'http');
    }
  },
  watch: {
    currentTime: function() {
      let currentTime = Math.round(this.$refs.audio.currentTime);
      let totalTime = Math.round((this.music.size * 8) / this.music.br);
      this.$refs.currentBar.style.width = ((currentTime / totalTime) * 100).toFixed(2) + '%';
      this.$refs.dot.style.left = ((currentTime / totalTime) * 100).toFixed(2) + '%';
      if (currentTime >= totalTime) {
        this.playNext();
      }
    }
  },
  methods: {
    show() {
      this.showFlag = true;
      this.togglePlay = true;
      this.microphonePlay = true;
    },
    get(item) {
      // http://musicapi.duapp.com/api.php?type=url&id=26620756
      this.axios.get(musicApi.getSong(item.id)).then((res) => {
        this.music = res.data.data[0];
        this.$nextTick(() => {
          this.$refs.audio.play();
          this.$refs.audio.volume = 0.1;
        });
      });
    },
    back() {
      this.showFlag = false;
    },
    play() {
      if (!this.togglePlay) {
        this.$refs.audio.play();
        this.microphonePlay = true;
        this.coverPause = false;
      } else {
        this.$refs.audio.pause();
        this.microphonePlay = false;
        this.coverPause = true;
      }
      this.$store.commit('setTogglePlay', TOGGLE);
    },
    playPre() {
      // 更新当前歌曲位置
      let currentIndex = (this.currentIndex + this.musicList.length - 1) % this.musicList.length;
      this.$store.commit('setCurrentIndex', currentIndex);
      // 更新歌曲为前一首
      let item = this.musicList[this.currentIndex];
      this.$store.commit('setSingleMusic', item);
      this.get(item);
      this.microphonePlay = true;
      // this.togglePlay = true;
      this.$store.commit('setTogglePlay', TRUE);
      this.coverPause = false;
      this.coverAfresh = !this.coverAfresh;
    },
    playNext() {
      // 更新当前歌曲位置
      let currentIndex = (this.currentIndex + 1) % this.musicList.length;
      this.$store.commit('setCurrentIndex', currentIndex);
      // 更新歌曲为下一首
      let item = this.musicList[this.currentIndex];
      this.$store.commit('setSingleMusic', item);
      this.get(item);
      this.microphonePlay = true;
      this.$store.commit('setTogglePlay', TRUE);
      this.coverPause = false;
      this.coverAfresh = !this.coverAfresh;
    },
    getTimes() {
      let time = Math.round(this.$refs.audio.currentTime);
      let munite = this.addZero(Math.floor(time / 60));
      let second = this.addZero(time % 60);
      this.currentTime = munite + ':' + second;
    },
    controlBar(event) {
      let left = this.$refs.totalBar.offsetLeft;
      let current = this.$refs.totalBar;
      let totalWidth = this.$refs.totalBar.clientWidth;
      let barX = event.clientX;
      let totalTime = Math.round((this.music.size * 8) / this.music.br);
      while (current.offsetParent !== null) {
        current = current.offsetParent;
        left += current.offsetLeft;
      }
      let scale = ((barX - left) / totalWidth).toFixed(2);
      let time = Math.round(scale * totalTime);
      let munite = this.addZero(Math.floor(time / 60));
      let second = this.addZero(time % 60);
      this.$refs.audio.currentTime = time;
      this.currentTime = munite + ':' + second;
    },
    addZero(value) {
      if (!value) {
        return '00';
      }
      return value > 9 ? value : '0' + value;
    }
  }
};
</script>
<style lang="scss" type="text/css">
@import '../../common/css/mixin.scss';
.musicPlay {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 30;
  width: 100%;
  height: 100%;
  background: #fff;
  &.fade-enter-active,
  &.fade-leave-active {
    transition: all .1s ease-out;
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  &.fade-enter,
  &.fade-leave-active {
    transform: translate3d(0, 100%, 0);
    opacity: 0;
  }
  .musicPlay-content {
  	width: 100%;
    height: 100%;
    .background {
      position: absolute;
      width: 100%;
      height: 100%;
      .mask {
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(20, 20, 20, 0.6);
        z-index: -1;
      }
      .image-wrapper {
        position: relative;
        width: 100%;
        max-width: 700px;
        height: 100%;
        z-index: -10;
        .image {
          height: 100%;
          width: 100%;
          max-width: 700px;
          filter: blur(40px);
        }
      }
    }
    .title {
      position: relative;
      display: flex;
      height: 50px;
      font-size: 0;
      color: #fff;
      &:before {
        content: ' ';
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background: radial-gradient(#ffffff -100%, rgba(200, 200, 200, 0) 80%);
      }
      .icon {
        flex: 0, 0, 50px;
        width: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 10px;
      }
      .musicInfo {
        flex: 1;
        .name {
          display: block;
          padding-top: 5px;
          height: 20px;
          line-height: 20px;
          font-size: 14px;
        }
        .singer {
          display: block;
          padding-bottom: 5px;
          height: 20px;
          line-height: 20px;
          font-size: 12px;
          color: rgb(220, 220, 220);
        }
        .icon-share {
          position: absolute;
          top: 0;
          right: 12px;
          line-height: 50px;
        }
      }
    }
    .jukebox {
      position: relative;
      .record-wrapper {
        position: relative;
        width: 100%;
        text-align: center;
        font-size: 0;
        overflow: hidden;
        .microphone {
          position: absolute;
          top: -16px;
          left: 44.4%;
          height: 140px;
          z-index: 10;
          transform: rotate(-26deg);
          transform-origin: 17.39% 11.59%;
          transition: all .5s;
          &.microphonePlay {
            position: absolute;
            top: -16px;
            left: 44.4%;
            height: 140px;
            transform: rotate(0deg);
            transform-origin: 17.39% 11.59%;
            transition: all .5s;
            z-index: 10;
          }
        }
        .record-content {
          position: relative;
          display: inline-block;
          width: 70%;
          max-width: 380px;
          max-height: 380px;
          margin-top: 70px;
          text-align: center;
          vertical-align: center;
          padding: 10px;
          border-radius: 50%;
          background: rgba(220, 220, 220, .2);
          .record {
            position: absolute;
            width: 100%;
            height: 100%;
            max-width: 400px;
            max-height: 400px;
            top: 0;
            right: 0;
            z-index: 5;
            background: url('../../../static/image/record.png') no-repeat;
            background-size: contain;
          }
          .cover {
            width: 100%;
            max-width: 380px;
            max-height: 380px;
            border-radius: 50%;
            z-index: -1;
            @include keyframes(rotateOne) {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
            @include keyframes(rotateTwo) {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
            animation: rotateOne 40s linear infinite;
            &.coverAfresh {
              animation: rotateTwo 40s linear infinite;
            }
            &.cover-pause {
              animation-play-state: paused;
            }
          }
        }
      }
    }
    .play-wrapper {
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: center;
      .icon-wrapper {
        display: inline-flex;
        width: 80%;
        height: 30px;
        line-height: 30px;
        color: #fff;
        text-align: center;
        i {
          flex: 1;
          &:last-child {
            transform: rotate(90deg);
          }
        }
      }
      .progress {
        display: flex;
        height: 30px;
        width: 100%;
        padding: 0 10px;
        box-sizing: border-box;
        line-height: 30px;
        font-size: 0;
        .time {
          flex: 0 0 40px;
          margin: 0 5px 0 0;
          width: 40px;
          font-size: 10px;
          color: #fff;
          &:last-child {
            margin: 0 0 0 5px;
            color: rgba(188, 188, 188, 0.8);
          }
        }
        .line {
          position: relative;
          flex: 1;
          align-self: center;
          padding-top: 2px;
          line-height: 28px;
          .totalBar {
            display: inline-block;
            width: 100%;
            height: 2px;
            background: rgba(188, 188, 188, 0.8);
          }
          .currentBar {
            position: absolute;
            left: 0;
            top: 14px;
            height: 2px;
            background: rgba(220, 20, 20, 0.8);
            z-index: 5;
          }
          .dot {
            position: absolute;
            top: 11px;
            left: 0;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #fff;
            z-index: 10;
          }
        }
      }
      .control-wrapper {
        display: inline-flex;
        align-items: center;
        width: 100%;
        height: 40px;
        margin-bottom: 10px;
        color: #fff;
        box-sizing: border-box;
        .icon-circulation {
          flex: 0 0 50px;
          font-size: 20px;
          transform: rotateX(180deg);
        }
        .control {
          flex: 1;
          display: flex;
          .icon {
            flex: 1;
            padding-top: 6px;
            font-size: 20px;
          }
          .icon-play,
          .icon-pause {
            padding-top: 4px;
            font-size: 24px;
          }
        }
        .icon-list {
          flex: 0 0 50px;
          font-size: 20px;
        }
      }
    }
  }
}
</style>

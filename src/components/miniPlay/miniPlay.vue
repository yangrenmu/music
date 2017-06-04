<template>
  <div class="miniPlay" v-show="showFlag">
    <div class="miniPlay-content">
      <div class="playInfo" @click="showMusicPlay">
        <div class="cover">
          <img class="image" :src="singleMusicUrl">
        </div>
      </div>
      <div class="name" @click="showMusicPlay">
        <span class="musicName">{{singleMusic.name}}</span>
        <span class="singer">{{singleMusic.ar[0].name}}</span>
      </div>
      <div class="control">
        <i @click="play" :class="{'icon-play': togglePlay, 'icon-pause': !togglePlay}" class="icon"></i>
        <i class="icon-list"></i>
      </div>
    </div>
    <musicPlay ref="musicPlay"></musicPlay>
  </div>
</template>
<script type="text/javascript">
import {
  mapGetters
} from 'vuex';
import musicPlay from '../musicPlay/musicPlay';
const TOGGLE = 0;
export default {
  data: function() {
    return {
      showFlag: false,
      music: ''
    };
  },
  methods: {
    show(item) {
      this.showFlag = true;
      this.$refs.musicPlay.get(item);
    },
    play() {
      let audio = document.getElementById('audio');
      if (!this.togglePlay) {
        audio.play();
      } else {
        audio.pause();
      }
      this.$store.commit('setTogglePlay', TOGGLE);
    },
    showMusicPlay() {
      this.$refs.musicPlay.show();
    }
  },
  computed: {
    ...mapGetters([
      'singleMusic',
      'togglePlay'
    ]),
    singleMusicUrl() {
      // 将 https 替换为 http
      let picUrl = this.singleMusic.al.picUrl;
      return picUrl.replace(/https/, 'http');
    }
  },
  components: {
    musicPlay
  }
};
</script>
<style lang="scss" type="text/css">
.miniPlay {
  position: absolute;
  height: 45px;
  width: 100%;
  bottom: 0;
  left: 0;
  background: #efefef;
  z-index: 30;
  .miniPlay-content {
    display: flex;
    justify-content: space-between;
    height: 100%;
    .playInfo {
      flex: 0 0 50px;
      width: 50px;
      height: 100%;
      font-size: 0;
      .cover {
        display: inline-block;
        padding: 0 5px;
        line-height: 45px;
        .image {
          display: inline-block;
          vertical-align: middle;
          height: 35px;
        }
      }
    }
    .name {
      display: inline-block;
      flex: 1;
      .musicName {
        display: block;
        max-width: 250px;
        height: 24px;
        line-height: 24px;
        font-size: 13px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        @media only screen and (max-width: 374px) {
          max-width: 200px;
        }
      }
      .singer {
        display: block;
        height: 22px;
        font-size: 12px;
        color: rgb(150, 150, 150);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .control {
      flex: 0 0 70px;
      text-align: right;
      font-size: 0;
      .icon,
      .icon-list {
        display: inline-block;
        padding: 1px 8px 0 0;
        height: 45px;
        line-height: 45px;
        font-size: 20px;
      }
      .icon {
        padding: 0 10px;
      }
    }
  }
}
</style>

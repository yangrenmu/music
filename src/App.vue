<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab">
      <div class="tab-item" @click="borderMove('recommends')">
        <router-link to="/recommends">个性推荐</router-link>
      </div>
      <div class="tab-item" @click="borderMove('songs')">
        <router-link to="/songs">歌单</router-link>
      </div>
      <div class="tab-item" @click="borderMove('radios')">
        <router-link to="/radios" >主播电台</router-link>
      </div>
      <div class="tab-item" @click="borderMove('rankings')">
        <router-link to="/rankings">排行榜</router-link>
      </div>
    </div>
    <span class="border-bottom" :class="borderMoveClass"></span>
    <keep-alive>
      <router-view class="router"></router-view>
    </keep-alive>
  </div>
</template>
<script>
import header from './components/header/header.vue';
export default {
  data() {
      return {
        borderMoveClass: 'recommends'
      };
    },
    methods: {
      borderMove: function(val) {
        this.borderMoveClass = val;
        if (val === 'recommends') {
          this.$store.commit('setSrcImage', 0);
        }
        if (val === 'radios') {
          this.$store.commit('setSrcImage', 3);
        }
      }
    },
    components: {
      'v-header': header
    }
};
</script>
<style lang="scss" type="text/css">
#app {
  font-size: 0;
  .tab {
    display: flex;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    background-color: #fff;
    .tab-item {
      flex: 1;
      a {
        color: #000;
        &.router-link-active {
          color: rgb(240, 20, 20);
        }
      }
      &:active {
        background: #f0f0f0;
      }
    }
  }
  .border-bottom {
    display: block;
    margin-top: -2px;
    width: 25%;
    height: 2px;
    background: rgb(240, 20, 20);
    transition: all 0.4s ease;
    &.recommends {
      transform: translate3d(0, 0, 0);
    }
    &.songs {
      transform: translate3d(100%, 0, 0);
    }
    &.radios {
      transform: translate3d(200%, 0, 0);
    }
    &.rankings {
      transform: translate3d(300%, 0, 0);
    }
  }
  .router {
    font-size: 10px;
  }
}
</style>

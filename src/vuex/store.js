import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    srcImage: {
      'pic1': '/static/image/01.jpg',
      'pic2': '/static/image/02.jpg',
      'pic3': '/static/image/03.jpg'
    },
    musicInfo: {
      creator: {
        avatarUrl: '',
        nickname: ''
      }
    },
    singleMusic: {
      name: '',
      al: {
        picUrl: ''
      },
      ar: [{
        name: ''
      }]
    },
    musicList: '',
    currentIndex: -1,
    togglePlay: true
  },
  getters: {
    srcImage: state => state.srcImage,
    musicInfo: state => state.musicInfo,
    singleMusic: state => state.singleMusic,
    musicList: state => state.musicList,
    currentIndex: state => state.currentIndex,
    togglePlay: state => state.togglePlay
  },
  mutations: {
    setSrcImage(state, index) {
      state.srcImage = {
        'pic1': '/static/image/' + index + '1.jpg',
        'pic2': '/static/image/' + index + '2.jpg',
        'pic3': '/static/image/' + index + '3.jpg'
      };
    },
    setMusicInfo(state, item) {
      state.musicInfo = item;
    },
    setSingleMusic(state, item) {
      state.singleMusic = item;
    },
    setMusicList(state, item) {
      state.musicList = item;
    },
    setCurrentIndex(state, index) {
      state.currentIndex = index;
    },
    setTogglePlay(state, change) {
      if (change === 1) {
        state.togglePlay = true;
      } else {
        state.togglePlay = !state.togglePlay;
      }
    }
  }
});

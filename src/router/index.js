import Vue from 'vue';
import Router from 'vue-router';
import recommends from '../components/recommends/recommends';
import songs from '../components/songs/songs';
import radios from '../components/radios/radios';
import rankings from '../components/rankings/rankings';

Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [{
    path: '',
    name: 'recommends',
    component: recommends
  }, {
    path: '/recommends',
    name: 'recommends',
    component: recommends
  }, {
    path: '/songs',
    name: 'songs',
    component: songs
  }, {
    path: '/radios',
    name: 'radios',
    component: radios
  }, {
    path: '/rankings',
    name: 'rankings',
    component: rankings
  }]
});

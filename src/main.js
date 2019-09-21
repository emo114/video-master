// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueVideoPlayer from 'vue-video-player'
import {LoadingPlugin,Toast} from 'vux'

import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)


Vue.component('toast', Toast)


import 'video.js/dist/video-js.css'

const hls = require('videojs-contrib-hls')

Vue.use(LoadingPlugin);
Vue.use(hls)
Vue.use(VueVideoPlayer )

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store
});

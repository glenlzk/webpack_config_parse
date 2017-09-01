import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store/'
import {routerMode} from './config/env'
import './config/rem'
import './config/exif'
import FastClick from 'fastclick'
import './fonts/iconfont'

import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';

/*console.log(MintUI);*/

import VueLazyload from 'vue-lazyload'

import './style/common';

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}

Vue.use(VueRouter);
Vue.use(MintUI);
//使用懒加载组件
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: require('./images/defaultImg.png'),
  error:require('./images/defaultImg.png'),
  attempt: 1,
  listenEvents: [ 'scroll', 'mousewheel' ]
});

const router = new VueRouter({
	routes,
	mode: routerMode,
	strict: process.env.NODE_ENV !== 'production',
  // 让每个页面都滚动到顶部，改变模式为mode: history
  scrollBehavior (to, from, savedPosition) {
    if(savedPosition) {
      setTimeout(() => {
        window.scrollTo(savedPosition.x, savedPosition.y)
      }, 200)
    } else {
      return { x: 0, y: 2 }
    }

  }
})


new Vue({
	router,
	store,
}).$mount('#app')


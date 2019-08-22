import Vue from 'vue';
import App from './App.vue';
import routes from './routes';
import { createStore } from './store';
import Router from 'vue-router';

Vue.use(Router);

Vue.config.productionTip = false; // 开启vuex 调试工具

export function createApp (context) {

  // 创建 router 实例
  const router = new Router({
    mode: 'history',
    routes
  });

  // 创建store 实例
  const store = createStore();

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });

  // 返回 app 和 router
  return { app, router, store };
}

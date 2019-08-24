import Vue from 'vue';
import App from './App.vue';
import { createStore } from './store';
import { createRouter } from './router';
import { sync } from 'vuex-router-sync';

Vue.config.productionTip = false; // 开启vuex 调试工具

export function createApp (context) {

  // 创建 router 实例
  const router = createRouter();

  // 创建store 实例
  const store = createStore();

  // 同步路由状态(route state)到 store
  sync(store, router);

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });

  // 返回 app 和 router
  return { app, router, store };
}

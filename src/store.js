// store.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

// 显示设置打开vue调试工具
// https://github.com/vuejs/vue-devtools/issues/190
// https://github.com/vuejs/vue-devtools/issues/405#issuecomment-399882681 放在这里的原因
Vue.config.devtools = true;

// 假定我们有一个可以返回 Promise 的
// 通用 API（请忽略此 API 具体实现细节）
export function createStore () {
  return new Vuex.Store({
    state: {
      name: ''
    },
    actions: {
      getName ({ commit }, value) {
        // `store.dispatch()` 会返回 Promise，以便我们能够知道数据在何时更新
        return new Promise((resolve, reject) => {
          setTimeout(function () {
            commit('setName', value);
            resolve();
          }, 500);
        });
      }
    },
    mutations: {
      setName (state, value) {
        state.name = value;
      }
    }
  });
}

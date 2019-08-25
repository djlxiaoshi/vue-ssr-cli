import Vue from 'vue';
import Router from 'vue-router';

import NotFount from './components/NotFound';
import AppShell from './components/AppShell';

Vue.use(Router);

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      { path: '/', component: () => import(/* webpackChunkName: "home" */'./components/Home.vue') },
      { path: '/about', component: () => import(/* webpackChunkName: "about" */'./components/About.vue') },
      { path: '/element', component: () => import(/* webpackChunkName: "about" */'./components/Element.vue') },
      { path: '/appshell', component: AppShell },
      { path: '**', component: NotFount }
    ]
  });
}


// 路由配置
export default [
  { path: '/', component: () => import(/* webpackChunkName: "home" */'./components/Home.vue') },
  { path: '/about', component: () => import(/* webpackChunkName: "about" */'./components/About.vue') }
];

const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const app = new Koa();
const koaRouter = require('koa-router');
const koaStatic = require('koa-static');
const { createBundleRenderer } = require('vue-server-renderer');

const resolve = file => path.resolve(__dirname, file);
const router = new koaRouter();

// const serverBundle = fs.readFileSync('./dist/bundle.server.js', 'utf-8');
// const renderer = createBundleRenderer(serverBundle, {
//   template: fs.readFileSync(resolve('./dist/index.ssr.html'), 'utf-8'),
// });

const serverBundle = require('./dist/vue-ssr-server-bundle');
const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template: fs.readFileSync(resolve('./dist/index.server.html'), 'utf-8'),
  clientManifest: require('./dist/vue-ssr-client-manifest.json'),
});

// 先匹配静态资源
app.use(koaStatic(path.resolve(__dirname, 'dist')));

// 静态资源没有匹配到的时候，再走这个服务端路由
router.get('*', async ctx => {

  ctx.body = await new Promise((resolve, reject) => {
    renderer.renderToString({title: 'DJLXS', url: ctx.req.url}, (err, data) => {

      if (err) {
        console.log('error', err);
        resolve(err.code); // 我们可以在前端路由中始终配置404页面
        return;
      }

      console.log('渲染成功', ctx.req.url, data);

      resolve(data)

    });
  });


});

app.use(router.routes());

app.listen(3700, function () {
  console.log('server is listening on port 3700')
});

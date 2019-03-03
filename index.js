import Koa from 'koa';
import Rollbar from 'rollbar';
import logger from 'koa-morgan';
import server from 'koa-static';
import Pug from 'koa-pug';
import dotenv from 'dotenv';
import Router from 'koa-router';

console.log('Перед стартом');
dotenv.config();

const port = process.env.PORT || 8080;

const rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
});

const app = new Koa();
const router = new Router();

app
  .use(server('.'))
  .use(logger('tiny'))
  .use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      rollbar.error(err, ctx.request);
    }
  });

const pug = new Pug({
  viewPath: './views',
  basedir: './views',
});

pug.use(app);

router.get('/', (ctx) => {
  ctx.render('index');
});

app.use(router.allowedMethods());
app.use(router.routes());

console.log(port);

app.listen(port);

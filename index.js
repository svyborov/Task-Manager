import Koa from 'koa';
import Rollbar from 'rollbar';
import logger from 'koa-morgan';
import server from 'koa-static';
import Pug from 'koa-pug';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';

import addRoutes from './routes';
import container from './container';

export default () => {
  console.log('Перед стартом');

  const rollbar = new Rollbar({
    accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
  });

  const app = new Koa();
  const router = new Router();

  app
    .use(bodyParser())
    .use(server('.'))
    .use(logger('tiny'))
    .use(async (ctx, next) => {
      try {
        await next();
      } catch (err) {
        // rollbar.error(err, ctx.request);
      }
    });

  const pug = new Pug({
    viewPath: './views',
    basedir: './views',
  });

  pug.use(app);

  addRoutes(router, container);

  app.use(router.allowedMethods());
  app.use(router.routes());

  return app;
};

import path from 'path';
import Koa from 'koa';
import Pug from 'koa-pug';
import Router from 'koa-router';
import koaLogger from 'koa-logger';
import serve from 'koa-static';
import koaWebpack from 'koa-webpack';
import bodyParser from 'koa-bodyparser';
import session from 'koa-generic-session';
import _ from 'lodash';
import methodOverride from 'koa-methodoverride';
import Rollbar from 'rollbar';
import flashMessage from 'koa-flash-message';

import webpackConfig from './webpack.config';
import addRoutes from './routes';
import container from './container';

export default () => {
  const rollbar = new Rollbar({
    accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
  });

  const app = new Koa();
  app.keys = ['some secret hurr'];

  app.use(session(app));
  app.use(flashMessage);
  app.use(async (ctx, next) => {
    ctx.state = {
      flashMessage: ctx.flashMessage,
      isSignedIn: () => ctx.session.userId !== undefined,
      currentUserId: ctx.session.userId,
    };
    await next();
  });
  app.use(bodyParser());
  app.use(serve(path.join(__dirname, 'public')));
  app.use(koaLogger());
  app.use(methodOverride((req) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      return req.body._method; // eslint-disable-line
    }
    return null;
  }));
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      if (process.env.NODE_ENV === 'production') {
        rollbar.error(err, ctx.request);
      }
    }
  });

  if (process.env.NODE_ENV === 'development') {
    koaWebpack({
      config: webpackConfig,
    }).then(m => app.use(m));
  }

  const router = new Router();
  addRoutes(router, container);
  app.use(router.allowedMethods());
  app.use(router.routes());

  const pug = new Pug({
    viewPath: path.join(__dirname, 'views'),
    basedir: path.join(__dirname, 'views'),
    noCache: process.env.NODE_ENV === 'development',
    debug: true,
    pretty: true,
    compileDebug: true,
    locals: [],
    helperPath: [
      { _ },
      { urlFor: (...args) => router.url(...args) },
    ],
  });

  pug.use(app);

  return app;
};

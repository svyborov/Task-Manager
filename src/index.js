/* import Koa from 'koa';
import Rollbar from 'rollbar';
import logger from 'koa-morgan';
import Router from 'koa-router';
import fs from 'fs';
*/
const Koa = require('koa');
const Rollbar = require('rollbar');
const logger = require('koa-morgan');
const Router = require('koa-router');
const fs = require('fs').promises;
require('dotenv').config();


console.log('Перед стартом');
console.log('ASD');

const port = process.env.PORT || 8080;

const rollbar = new Rollbar({
  accessToken: '8a936295c3b244eda988198d918e9fca',
  captureUncaught: true,
  captureUnhandledRejections: true,
});

const app = new Koa();
const router = new Router();

router.get('/', async (ctx) => {
  const startPage = await fs.readFile('/app/index.html');
  ctx.body = startPage.toString();
});

app
  .use(logger('tiny'))
  .use(router.routes())
  .use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      rollbar.error(err, ctx.request);
    }
  });

console.log(port);

app.listen(port);

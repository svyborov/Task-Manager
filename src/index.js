/* import Koa from 'koa';
import Rollbar from 'rollbar';
import logger from 'koa-morgan';
import Router from 'koa-router';
import fs from 'fs';
*/
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const Koa = require('koa');
const Rollbar = require('rollbar');
const logger = require('koa-morgan');
const Router = require('koa-router');
const fs = require('fs').promises;
require('./style.css');
require('dotenv').config();


console.log('Перед стартом');
console.log('ASD');

const port = process.env.PORT || 8080;

const rollbar = new Rollbar(process.env.ROLLBAR);

const app = new Koa();
const router = new Router();

router.get('/', async (ctx) => {
  const startPage = await fs.readFile(`${__dirname}/index.html`);
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

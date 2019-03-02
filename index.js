// import '@babel/polyfill';

import Koa from 'koa';
import Rollbar from 'rollbar';
import logger from 'koa-morgan';
import server from 'koa-static';
import dotenv from 'dotenv';

/*
const Koa = require('koa');
const Rollbar = require('rollbar');
const logger = require('koa-morgan');
const server = require('koa-static');
require('dotenv').config();
*/
console.log('Перед стартом');
dotenv.config();

const port = process.env.PORT || 8080;

const rollbar = new Rollbar(process.env.ROLLBAR);

const app = new Koa();

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

console.log(port);

app.listen(port);

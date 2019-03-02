"use strict";

var _koa = _interopRequireDefault(require("koa"));

var _rollbar = _interopRequireDefault(require("rollbar"));

var _koaMorgan = _interopRequireDefault(require("koa-morgan"));

var _koaStatic = _interopRequireDefault(require("koa-static"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import '@babel/polyfill';

/*
const Koa = require('koa');
const Rollbar = require('rollbar');
const logger = require('koa-morgan');
const server = require('koa-static');
require('dotenv').config();
*/
console.log('Перед стартом');

_dotenv.default.config();

const port = process.env.PORT || 8080;
console.log(process.env.ROLLBAR_ACCESS_TOKEN);
const rollbar = new _rollbar.default({
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true
});
const app = new _koa.default();
app.use((0, _koaStatic.default)('.')).use((0, _koaMorgan.default)('tiny')).use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    rollbar.error(err, ctx.request);
  }
});
console.log(port);
app.listen(port);

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFOQTs7QUFRQTs7Ozs7OztBQU9BLE9BQU8sQ0FBQyxHQUFSLENBQVksZUFBWjs7QUFDQSxnQkFBTyxNQUFQOztBQUVBLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFSLENBQVksSUFBWixJQUFvQixJQUFqQztBQUNBLE9BQU8sQ0FBQyxHQUFSLENBQVksT0FBTyxDQUFDLEdBQVIsQ0FBWSxvQkFBeEI7QUFDQSxNQUFNLE9BQU8sR0FBRyxJQUFJLGdCQUFKLENBQVk7QUFDMUIsRUFBQSxXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQVIsQ0FBWSxvQkFEQztBQUUxQixFQUFBLGVBQWUsRUFBRSxJQUZTO0FBRzFCLEVBQUEsMEJBQTBCLEVBQUU7QUFIRixDQUFaLENBQWhCO0FBTUEsTUFBTSxHQUFHLEdBQUcsSUFBSSxZQUFKLEVBQVo7QUFFQSxHQUFHLENBQ0EsR0FESCxDQUNPLHdCQUFPLEdBQVAsQ0FEUCxFQUVHLEdBRkgsQ0FFTyx3QkFBTyxNQUFQLENBRlAsRUFHRyxHQUhILENBR08sT0FBTyxHQUFQLEVBQVksSUFBWixLQUFxQjtBQUN4QixNQUFJO0FBQ0YsVUFBTSxJQUFJLEVBQVY7QUFDRCxHQUZELENBRUUsT0FBTyxHQUFQLEVBQVk7QUFDWixJQUFBLE9BQU8sQ0FBQyxLQUFSLENBQWMsR0FBZCxFQUFtQixHQUFHLENBQUMsT0FBdkI7QUFDRDtBQUNGLENBVEg7QUFXQSxPQUFPLENBQUMsR0FBUixDQUFZLElBQVo7QUFFQSxHQUFHLENBQUMsTUFBSixDQUFXLElBQVgiLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0ICdAYmFiZWwvcG9seWZpbGwnO1xuXG5pbXBvcnQgS29hIGZyb20gJ2tvYSc7XG5pbXBvcnQgUm9sbGJhciBmcm9tICdyb2xsYmFyJztcbmltcG9ydCBsb2dnZXIgZnJvbSAna29hLW1vcmdhbic7XG5pbXBvcnQgc2VydmVyIGZyb20gJ2tvYS1zdGF0aWMnO1xuaW1wb3J0IGRvdGVudiBmcm9tICdkb3RlbnYnO1xuXG4vKlxuY29uc3QgS29hID0gcmVxdWlyZSgna29hJyk7XG5jb25zdCBSb2xsYmFyID0gcmVxdWlyZSgncm9sbGJhcicpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgna29hLW1vcmdhbicpO1xuY29uc3Qgc2VydmVyID0gcmVxdWlyZSgna29hLXN0YXRpYycpO1xucmVxdWlyZSgnZG90ZW52JykuY29uZmlnKCk7XG4qL1xuY29uc29sZS5sb2coJ9Cf0LXRgNC10LQg0YHRgtCw0YDRgtC+0LwnKTtcbmRvdGVudi5jb25maWcoKTtcblxuY29uc3QgcG9ydCA9IHByb2Nlc3MuZW52LlBPUlQgfHwgODA4MDtcbmNvbnNvbGUubG9nKHByb2Nlc3MuZW52LlJPTExCQVJfQUNDRVNTX1RPS0VOKTtcbmNvbnN0IHJvbGxiYXIgPSBuZXcgUm9sbGJhcih7XG4gIGFjY2Vzc1Rva2VuOiBwcm9jZXNzLmVudi5ST0xMQkFSX0FDQ0VTU19UT0tFTixcbiAgY2FwdHVyZVVuY2F1Z2h0OiB0cnVlLFxuICBjYXB0dXJlVW5oYW5kbGVkUmVqZWN0aW9uczogdHJ1ZSxcbn0pO1xuXG5jb25zdCBhcHAgPSBuZXcgS29hKCk7XG5cbmFwcFxuICAudXNlKHNlcnZlcignLicpKVxuICAudXNlKGxvZ2dlcigndGlueScpKVxuICAudXNlKGFzeW5jIChjdHgsIG5leHQpID0+IHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgbmV4dCgpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcm9sbGJhci5lcnJvcihlcnIsIGN0eC5yZXF1ZXN0KTtcbiAgICB9XG4gIH0pO1xuXG5jb25zb2xlLmxvZyhwb3J0KTtcblxuYXBwLmxpc3Rlbihwb3J0KTtcbiJdfQ==
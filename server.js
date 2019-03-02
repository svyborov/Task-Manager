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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFOQTs7QUFRQTs7Ozs7OztBQU9BLE9BQU8sQ0FBQyxHQUFSLENBQVksZUFBWjs7QUFDQSxnQkFBTyxNQUFQOztBQUVBLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFSLENBQVksSUFBWixJQUFvQixJQUFqQztBQUVBLE1BQU0sT0FBTyxHQUFHLElBQUksZ0JBQUosQ0FBWTtBQUMxQixFQUFBLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBUixDQUFZLG9CQURDO0FBRTFCLEVBQUEsZUFBZSxFQUFFLElBRlM7QUFHMUIsRUFBQSwwQkFBMEIsRUFBRTtBQUhGLENBQVosQ0FBaEI7QUFNQSxNQUFNLEdBQUcsR0FBRyxJQUFJLFlBQUosRUFBWjtBQUVBLEdBQUcsQ0FDQSxHQURILENBQ08sd0JBQU8sR0FBUCxDQURQLEVBRUcsR0FGSCxDQUVPLHdCQUFPLE1BQVAsQ0FGUCxFQUdHLEdBSEgsQ0FHTyxPQUFPLEdBQVAsRUFBWSxJQUFaLEtBQXFCO0FBQ3hCLE1BQUk7QUFDRixVQUFNLElBQUksRUFBVjtBQUNELEdBRkQsQ0FFRSxPQUFPLEdBQVAsRUFBWTtBQUNaLElBQUEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxHQUFkLEVBQW1CLEdBQUcsQ0FBQyxPQUF2QjtBQUNEO0FBQ0YsQ0FUSDtBQVdBLE9BQU8sQ0FBQyxHQUFSLENBQVksSUFBWjtBQUVBLEdBQUcsQ0FBQyxNQUFKLENBQVcsSUFBWCIsImZpbGUiOiJzZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgJ0BiYWJlbC9wb2x5ZmlsbCc7XG5cbmltcG9ydCBLb2EgZnJvbSAna29hJztcbmltcG9ydCBSb2xsYmFyIGZyb20gJ3JvbGxiYXInO1xuaW1wb3J0IGxvZ2dlciBmcm9tICdrb2EtbW9yZ2FuJztcbmltcG9ydCBzZXJ2ZXIgZnJvbSAna29hLXN0YXRpYyc7XG5pbXBvcnQgZG90ZW52IGZyb20gJ2RvdGVudic7XG5cbi8qXG5jb25zdCBLb2EgPSByZXF1aXJlKCdrb2EnKTtcbmNvbnN0IFJvbGxiYXIgPSByZXF1aXJlKCdyb2xsYmFyJyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCdrb2EtbW9yZ2FuJyk7XG5jb25zdCBzZXJ2ZXIgPSByZXF1aXJlKCdrb2Etc3RhdGljJyk7XG5yZXF1aXJlKCdkb3RlbnYnKS5jb25maWcoKTtcbiovXG5jb25zb2xlLmxvZygn0J/QtdGA0LXQtCDRgdGC0LDRgNGC0L7QvCcpO1xuZG90ZW52LmNvbmZpZygpO1xuXG5jb25zdCBwb3J0ID0gcHJvY2Vzcy5lbnYuUE9SVCB8fCA4MDgwO1xuXG5jb25zdCByb2xsYmFyID0gbmV3IFJvbGxiYXIoe1xuICBhY2Nlc3NUb2tlbjogcHJvY2Vzcy5lbnYuUk9MTEJBUl9BQ0NFU1NfVE9LRU4sXG4gIGNhcHR1cmVVbmNhdWdodDogdHJ1ZSxcbiAgY2FwdHVyZVVuaGFuZGxlZFJlamVjdGlvbnM6IHRydWUsXG59KTtcblxuY29uc3QgYXBwID0gbmV3IEtvYSgpO1xuXG5hcHBcbiAgLnVzZShzZXJ2ZXIoJy4nKSlcbiAgLnVzZShsb2dnZXIoJ3RpbnknKSlcbiAgLnVzZShhc3luYyAoY3R4LCBuZXh0KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IG5leHQoKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJvbGxiYXIuZXJyb3IoZXJyLCBjdHgucmVxdWVzdCk7XG4gICAgfVxuICB9KTtcblxuY29uc29sZS5sb2cocG9ydCk7XG5cbmFwcC5saXN0ZW4ocG9ydCk7XG4iXX0=
"use strict";

var _koa = _interopRequireDefault(require("koa"));

var _rollbar = _interopRequireDefault(require("rollbar"));

var _koaMorgan = _interopRequireDefault(require("koa-morgan"));

var _koaStatic = _interopRequireDefault(require("koa-static"));

var _koaPug = _interopRequireDefault(require("koa-pug"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('Перед стартом');

_dotenv.default.config();

const port = process.env.PORT || 8080;
const rollbar = new _rollbar.default({
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true
});
const app = new _koa.default();
const router = new _koaRouter.default();
app.use((0, _koaStatic.default)('.')).use((0, _koaMorgan.default)('tiny')).use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    rollbar.error(err, ctx.request);
  }
});
const pug = new _koaPug.default({
  viewPath: './views',
  basedir: './views'
});
pug.use(app);
router.get('/', ctx => {
  ctx.render('index');
});

app.use(router.allowedMethods());
app.use(router.routes());
console.log(port);
app.listen(port);

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxPQUFPLENBQUMsR0FBUixDQUFZLGVBQVo7O0FBQ0EsZ0JBQU8sTUFBUDs7QUFFQSxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsR0FBUixDQUFZLElBQVosSUFBb0IsSUFBakM7QUFFQSxNQUFNLE9BQU8sR0FBRyxJQUFJLGdCQUFKLENBQVk7QUFDMUIsRUFBQSxXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQVIsQ0FBWSxvQkFEQztBQUUxQixFQUFBLGVBQWUsRUFBRSxJQUZTO0FBRzFCLEVBQUEsMEJBQTBCLEVBQUU7QUFIRixDQUFaLENBQWhCO0FBTUEsTUFBTSxHQUFHLEdBQUcsSUFBSSxZQUFKLEVBQVo7QUFDQSxNQUFNLE1BQU0sR0FBRyxJQUFJLGtCQUFKLEVBQWY7QUFFQSxHQUFHLENBQ0EsR0FESCxDQUNPLHdCQUFPLEdBQVAsQ0FEUCxFQUVHLEdBRkgsQ0FFTyx3QkFBTyxNQUFQLENBRlAsRUFHRyxHQUhILENBR08sT0FBTyxHQUFQLEVBQVksSUFBWixLQUFxQjtBQUN4QixNQUFJO0FBQ0YsVUFBTSxJQUFJLEVBQVY7QUFDRCxHQUZELENBRUUsT0FBTyxHQUFQLEVBQVk7QUFDWixJQUFBLE9BQU8sQ0FBQyxLQUFSLENBQWMsR0FBZCxFQUFtQixHQUFHLENBQUMsT0FBdkI7QUFDRDtBQUNGLENBVEg7QUFXQSxNQUFNLEdBQUcsR0FBRyxJQUFJLGVBQUosQ0FBUTtBQUNsQixFQUFBLFFBQVEsRUFBRSxTQURRO0FBRWxCLEVBQUEsT0FBTyxFQUFFO0FBRlMsQ0FBUixDQUFaO0FBS0EsR0FBRyxDQUFDLEdBQUosQ0FBUSxHQUFSO0FBRUEsTUFBTSxDQUFDLEdBQVAsQ0FBVyxHQUFYLEVBQWlCLEdBQUQsSUFBUztBQUN2QixFQUFBLEdBQUcsQ0FBQyxNQUFKLENBQVcsT0FBWDtBQUNELENBRkQ7QUFJQSxHQUFHLENBQUMsR0FBSixDQUFRLE1BQU0sQ0FBQyxjQUFQLEVBQVI7QUFDQSxHQUFHLENBQUMsR0FBSixDQUFRLE1BQU0sQ0FBQyxNQUFQLEVBQVI7QUFFQSxPQUFPLENBQUMsR0FBUixDQUFZLElBQVo7QUFFQSxHQUFHLENBQUMsTUFBSixDQUFXLElBQVgiLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEtvYSBmcm9tICdrb2EnO1xuaW1wb3J0IFJvbGxiYXIgZnJvbSAncm9sbGJhcic7XG5pbXBvcnQgbG9nZ2VyIGZyb20gJ2tvYS1tb3JnYW4nO1xuaW1wb3J0IHNlcnZlciBmcm9tICdrb2Etc3RhdGljJztcbmltcG9ydCBQdWcgZnJvbSAna29hLXB1Zyc7XG5pbXBvcnQgZG90ZW52IGZyb20gJ2RvdGVudic7XG5pbXBvcnQgUm91dGVyIGZyb20gJ2tvYS1yb3V0ZXInO1xuXG5jb25zb2xlLmxvZygn0J/QtdGA0LXQtCDRgdGC0LDRgNGC0L7QvCcpO1xuZG90ZW52LmNvbmZpZygpO1xuXG5jb25zdCBwb3J0ID0gcHJvY2Vzcy5lbnYuUE9SVCB8fCA4MDgwO1xuXG5jb25zdCByb2xsYmFyID0gbmV3IFJvbGxiYXIoe1xuICBhY2Nlc3NUb2tlbjogcHJvY2Vzcy5lbnYuUk9MTEJBUl9BQ0NFU1NfVE9LRU4sXG4gIGNhcHR1cmVVbmNhdWdodDogdHJ1ZSxcbiAgY2FwdHVyZVVuaGFuZGxlZFJlamVjdGlvbnM6IHRydWUsXG59KTtcblxuY29uc3QgYXBwID0gbmV3IEtvYSgpO1xuY29uc3Qgcm91dGVyID0gbmV3IFJvdXRlcigpO1xuXG5hcHBcbiAgLnVzZShzZXJ2ZXIoJy4nKSlcbiAgLnVzZShsb2dnZXIoJ3RpbnknKSlcbiAgLnVzZShhc3luYyAoY3R4LCBuZXh0KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IG5leHQoKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJvbGxiYXIuZXJyb3IoZXJyLCBjdHgucmVxdWVzdCk7XG4gICAgfVxuICB9KTtcblxuY29uc3QgcHVnID0gbmV3IFB1Zyh7XG4gIHZpZXdQYXRoOiAnLi92aWV3cycsXG4gIGJhc2VkaXI6ICcuL3ZpZXdzJyxcbn0pO1xuXG5wdWcudXNlKGFwcCk7XG5cbnJvdXRlci5nZXQoJy8nLCAoY3R4KSA9PiB7XG4gIGN0eC5yZW5kZXIoJ2luZGV4Jyk7XG59KTtcblxuYXBwLnVzZShyb3V0ZXIuYWxsb3dlZE1ldGhvZHMoKSk7XG5hcHAudXNlKHJvdXRlci5yb3V0ZXMoKSk7XG5cbmNvbnNvbGUubG9nKHBvcnQpO1xuXG5hcHAubGlzdGVuKHBvcnQpO1xuIl19

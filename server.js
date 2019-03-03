"use strict";

var _koa = _interopRequireDefault(require("koa"));

var _rollbar = _interopRequireDefault(require("rollbar"));

var _koaMorgan = _interopRequireDefault(require("koa-morgan"));

var _koaStatic = _interopRequireDefault(require("koa-static"));

var _koaPug = _interopRequireDefault(require("koa-pug"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import '@babel/polyfill';
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


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFSQTtBQVVBLE9BQU8sQ0FBQyxHQUFSLENBQVksZUFBWjs7QUFDQSxnQkFBTyxNQUFQOztBQUVBLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFSLENBQVksSUFBWixJQUFvQixJQUFqQztBQUVBLE1BQU0sT0FBTyxHQUFHLElBQUksZ0JBQUosQ0FBWTtBQUMxQixFQUFBLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBUixDQUFZLG9CQURDO0FBRTFCLEVBQUEsZUFBZSxFQUFFLElBRlM7QUFHMUIsRUFBQSwwQkFBMEIsRUFBRTtBQUhGLENBQVosQ0FBaEI7QUFNQSxNQUFNLEdBQUcsR0FBRyxJQUFJLFlBQUosRUFBWjtBQUNBLE1BQU0sTUFBTSxHQUFHLElBQUksa0JBQUosRUFBZjtBQUVBLEdBQUcsQ0FDQSxHQURILENBQ08sd0JBQU8sR0FBUCxDQURQLEVBRUcsR0FGSCxDQUVPLHdCQUFPLE1BQVAsQ0FGUCxFQUdHLEdBSEgsQ0FHTyxPQUFPLEdBQVAsRUFBWSxJQUFaLEtBQXFCO0FBQ3hCLE1BQUk7QUFDRixVQUFNLElBQUksRUFBVjtBQUNELEdBRkQsQ0FFRSxPQUFPLEdBQVAsRUFBWTtBQUNaLElBQUEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxHQUFkLEVBQW1CLEdBQUcsQ0FBQyxPQUF2QjtBQUNEO0FBQ0YsQ0FUSDtBQVdBLE1BQU0sR0FBRyxHQUFHLElBQUksZUFBSixDQUFRO0FBQ2xCLEVBQUEsUUFBUSxFQUFFLFNBRFE7QUFFbEIsRUFBQSxPQUFPLEVBQUU7QUFGUyxDQUFSLENBQVo7QUFLQSxHQUFHLENBQUMsR0FBSixDQUFRLEdBQVI7QUFFQSxNQUFNLENBQUMsR0FBUCxDQUFXLEdBQVgsRUFBaUIsR0FBRCxJQUFTO0FBQ3ZCLEVBQUEsR0FBRyxDQUFDLE1BQUosQ0FBVyxPQUFYO0FBQ0QsQ0FGRDtBQUlBLEdBQUcsQ0FBQyxHQUFKLENBQVEsTUFBTSxDQUFDLGNBQVAsRUFBUjtBQUNBLEdBQUcsQ0FBQyxHQUFKLENBQVEsTUFBTSxDQUFDLE1BQVAsRUFBUjtBQUVBLE9BQU8sQ0FBQyxHQUFSLENBQVksSUFBWjtBQUVBLEdBQUcsQ0FBQyxNQUFKLENBQVcsSUFBWCIsImZpbGUiOiJzZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgJ0BiYWJlbC9wb2x5ZmlsbCc7XG5cbmltcG9ydCBLb2EgZnJvbSAna29hJztcbmltcG9ydCBSb2xsYmFyIGZyb20gJ3JvbGxiYXInO1xuaW1wb3J0IGxvZ2dlciBmcm9tICdrb2EtbW9yZ2FuJztcbmltcG9ydCBzZXJ2ZXIgZnJvbSAna29hLXN0YXRpYyc7XG5pbXBvcnQgUHVnIGZyb20gJ2tvYS1wdWcnO1xuaW1wb3J0IGRvdGVudiBmcm9tICdkb3RlbnYnO1xuaW1wb3J0IFJvdXRlciBmcm9tICdrb2Etcm91dGVyJztcblxuY29uc29sZS5sb2coJ9Cf0LXRgNC10LQg0YHRgtCw0YDRgtC+0LwnKTtcbmRvdGVudi5jb25maWcoKTtcblxuY29uc3QgcG9ydCA9IHByb2Nlc3MuZW52LlBPUlQgfHwgODA4MDtcblxuY29uc3Qgcm9sbGJhciA9IG5ldyBSb2xsYmFyKHtcbiAgYWNjZXNzVG9rZW46IHByb2Nlc3MuZW52LlJPTExCQVJfQUNDRVNTX1RPS0VOLFxuICBjYXB0dXJlVW5jYXVnaHQ6IHRydWUsXG4gIGNhcHR1cmVVbmhhbmRsZWRSZWplY3Rpb25zOiB0cnVlLFxufSk7XG5cbmNvbnN0IGFwcCA9IG5ldyBLb2EoKTtcbmNvbnN0IHJvdXRlciA9IG5ldyBSb3V0ZXIoKTtcblxuYXBwXG4gIC51c2Uoc2VydmVyKCcuJykpXG4gIC51c2UobG9nZ2VyKCd0aW55JykpXG4gIC51c2UoYXN5bmMgKGN0eCwgbmV4dCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBuZXh0KCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByb2xsYmFyLmVycm9yKGVyciwgY3R4LnJlcXVlc3QpO1xuICAgIH1cbiAgfSk7XG5cbmNvbnN0IHB1ZyA9IG5ldyBQdWcoe1xuICB2aWV3UGF0aDogJy4vdmlld3MnLFxuICBiYXNlZGlyOiAnLi92aWV3cycsXG59KTtcblxucHVnLnVzZShhcHApO1xuXG5yb3V0ZXIuZ2V0KCcvJywgKGN0eCkgPT4ge1xuICBjdHgucmVuZGVyKCdpbmRleCcpO1xufSk7XG5cbmFwcC51c2Uocm91dGVyLmFsbG93ZWRNZXRob2RzKCkpO1xuYXBwLnVzZShyb3V0ZXIucm91dGVzKCkpO1xuXG5jb25zb2xlLmxvZyhwb3J0KTtcblxuYXBwLmxpc3Rlbihwb3J0KTtcbiJdfQ==

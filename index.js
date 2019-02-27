import Koa from 'koa';
import Rollbar from 'rollbar';

const port = process.env.PORT || 8080;

const rollbar = new Rollbar({
  accessToken: '8a936295c3b244eda988198d918e9fca',
  captureUncaught: true,
  captureUnhandledRejections: true,
});

const app = new Koa();

app.use(Koa.static(__dirname));

// Errors handling using Rollbar as first middleware to catch exception
app.use(async (ctx) => {
  try {
    console.log('ПОЛУЧИЛОСЬ!!1');
    ctx.body = 'Hello World';
  } catch (err) {
    rollbar.error(err, ctx.request);
  }
});

app.listen(port);

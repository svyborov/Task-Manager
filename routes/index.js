export default (router) => {
  router.get('/', (ctx) => {
    ctx.render('welcome/index');
  });

  router.get('/signup', (ctx) => {
    ctx.render('users/new');
  });

  router.get('/login', (ctx) => {
    ctx.render('sessions/new');
  });
};

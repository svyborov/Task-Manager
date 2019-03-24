export default (router) => {
  router.get('root', '/', (ctx) => {
    if (ctx.session.userId) {
      ctx.redirect('tasks');
    }
    ctx.render('welcome/index');
  });
};

const checkLogin = async (ctx, next) => {
  if (!ctx.session.userId) {
    ctx.flashMessage.warning = 'You need to log in to view this page';
    ctx.redirect('/');
    return;
  }
  await next();
};

const checkRights = async (ctx, next) => {
  if (parseInt(ctx.params.id, 10) !== ctx.session.userId) {
    ctx.flashMessage.warning = "You don't have permission to perform this action";
    ctx.redirect('/');
    return;
  }
  await next();
};

export { checkLogin, checkRights };

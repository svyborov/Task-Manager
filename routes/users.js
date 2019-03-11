import buildFormObj from '../lib/formObjectBuilder';
import { User } from '../models';

export default (router) => {
  router
    .get('users', '/users', async (ctx) => {
      const users = await User.findAll();
      ctx.render('users', { users });
    })
    .get('/signup', (ctx) => {
      const user = User.build();
      ctx.render('users/new', { f: buildFormObj(user) });
    })
    .post('users', '/users', async (ctx) => {
      const { request: { body: form } } = ctx;
      console.log(ctx);
      console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
      console.log(ctx.req);
      console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
      console.log(ctx.request);
      console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
      console.log(ctx.request.body);
      console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
      console.log(form);
      const user = User.build(form);
      console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
      try {
        await user.save();
        // ctx.flash.set('User has been created');
        const users = await User.findAll();
        console.log(users);
        // ctx.redirect(router.url('root'));
      } catch (e) {
        console.log('ОШИБОЧКА');
        console.log(e);
        ctx.render('users/new', { f: buildFormObj(user, e) });
      }
    });
};

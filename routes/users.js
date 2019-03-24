import buildFormObj from '../lib/formObjectBuilder';
import { User } from '../models';
import { checkLogin, checkRights } from '../lib/utils';

export default (router) => {
  router
    .get('users', '/users', checkLogin, async (ctx) => {
      const users = await User.findAll();
      ctx.render('users', { users });
    })
    .get('newUser', '/users/new', (ctx) => {
      const user = User.build();
      ctx.render('users/new', { f: buildFormObj(user) });
    })
    .post('createUsers', '/users', async (ctx) => {
      const { body: { form } } = ctx.request;
      const { firstName, lastName, email } = form;
      const userWhithEmail = await User.findOne({ where: { email } });
      if (userWhithEmail) {
        ctx.flashMessage.warning = 'email address already exists';
        ctx.render('users/new', { f: buildFormObj({ firstName, lastName }) });
        return;
      }
      const user = User.build(form);
      try {
        await user.save();
        ctx.flashMessage.notice = 'User has been created';
        ctx.redirect(router.url('root'));
      } catch (e) {
        ctx.render('users/new', { f: buildFormObj(user, e) });
      }
    })
    .get('showUser', '/users/:id', checkLogin, async (ctx) => {
      const { id } = ctx.params;
      const user = await User.findByPk(id);
      ctx.render('users/show', { user });
    })
    .get('editUser', '/users/:id/edit', checkRights, async (ctx) => {
      const { id } = ctx.params;
      const user = await User.findByPk(id);
      ctx.render('users/edit', { f: buildFormObj(user), user });
    })
    .delete('deleteUser', '/users/:id/delete', checkRights, async (ctx) => {
      const { id } = ctx.params;
      const user = await User.findByPk(id);
      await user.destroy();
      ctx.session = {};
      ctx.redirect(router.url('root'));
    })
    .patch('updateUser', '/users/:id', checkRights, async (ctx) => {
      const { id } = ctx.params;
      const { body: { form } } = ctx.request;
      const {
        firstName, lastName, email, password,
      } = form;
      const user = await User.findByPk(id);
      try {
        await user.update({
          firstName, lastName, email, password,
        });
        ctx.flashMessage.notice = 'User has been updated';
        ctx.redirect(router.url('root'));
      } catch (e) {
        ctx.render('users/new', { f: buildFormObj(user, e) });
      }
    });
};

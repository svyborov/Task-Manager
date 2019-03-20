import buildFormObj from '../lib/formObjectBuilder';
import { encrypt } from '../lib/secure';
import { User } from '../models';

export default (router) => {
  router
    .get('newSession', '/session', async (ctx) => {
      const data = {};
      ctx.render('sessions/new', { f: buildFormObj(data) });
    })
    .post('createSession', '/session/new', async (ctx) => {
      const { form: { email, password } } = ctx.request.body;
      const user = await User.findOne({ where: { email } });
      if (user && user.passwordDigest === encrypt(password)) {
        ctx.session.userId = user.id;
        ctx.redirect(router.url('root'));
        return;
      }
      ctx.flashMessage.notice = 'email or password were wrong';
      ctx.render('sessions/new', { f: buildFormObj({ email }) });
    })
    .delete('deleteSession', '/session/delete', (ctx) => {
      ctx.session = {};
      ctx.redirect(router.url('root'));
    });
};

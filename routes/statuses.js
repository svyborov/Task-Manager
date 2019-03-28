import buildFormObj from '../lib/formObjectBuilder';
import { TaskStatus } from '../models';
import { checkLogin } from '../lib/utils';


export default (router) => {
  router
    .get('statuses', '/statuses', checkLogin, async (ctx) => {
      try {
        const statuses = await TaskStatus.findAll();
        const minStatusId = await TaskStatus.min('id');
        ctx.render('statuses', { f: buildFormObj(statuses), statuses, minStatusId });
      } catch (e) {
        ctx.render('statuses', { f: buildFormObj(e) });
      }
    })
    .get('newStatus', '/statuses/new', checkLogin, (ctx) => {
      const status = TaskStatus.build();
      ctx.render('statuses/new', { f: buildFormObj(status) });
    })
    .post('createStatus', '/statuses', async (ctx) => {
      const { body: { form } } = ctx.request;
      const status = TaskStatus.build(form);
      try {
        await status.save();
        ctx.flashMessage.notice = 'Status has been created';
        ctx.redirect(router.url('statuses'));
      } catch (e) {
        ctx.render('statuses/new', { f: buildFormObj(status, e) });
      }
    })
    .patch('updateStatus', '/statuses/:id', checkLogin, async (ctx) => {
      const { id } = ctx.params;
      const { body: { name } } = ctx.request;
      const status = await TaskStatus.findByPk(id);
      try {
        await status.update({ name });
        ctx.flashMessage.notice = 'Status has been updated';
        ctx.redirect(router.url('statuses'));
      } catch (e) {
        ctx.flashMessage.warning = 'Invalid fields';
        const statuses = await TaskStatus.findAll();
        ctx.render('statuses', { f: buildFormObj(status, e), statuses });
      }
    })
    .delete('deleteStatus', '/statuses/:id/delete', checkLogin, async (ctx) => {
      const { id } = ctx.params;
      const status = await TaskStatus.findOne({ where: { id } });
      try {
        await status.destroy();
        ctx.redirect(router.url('statuses'));
      } catch (e) {
        ctx.flashMessage.warning = 'Unable to delete the status, it may be associated with the task';
        const statuses = await TaskStatus.findAll();
        ctx.render('statuses', { f: buildFormObj(status, e), statuses });
      }
    });
};

import buildFormObj from '../lib/formObjectBuilder';
import {
  TaskStatus,
} from '../models';

export default (router) => {
  router
    .get('statuses', '/statuses', async (ctx) => {
      try {
        const statuses = await TaskStatus.findAll();
        ctx.render('statuses', { statuses });
      } catch (e) {
        console.log(e);
        ctx.render('statuses', { f: buildFormObj(e) });
      }
    })
    .get('newStatus', '/statuses/new', (ctx) => {
      const status = TaskStatus.build();
      ctx.render('statuses/new', { f: buildFormObj(status) });
    })
    .post('createStatus', '/statuses', async (ctx) => {
      const { body: { form } } = ctx.request;
      // const { name, description } = form;
      console.log(form);
      const status = TaskStatus.build(form);
      try {
        await status.save();
        ctx.flashMessage.notice = 'Status has been created';
        ctx.redirect(router.url('statuses'));
      } catch (e) {
        console.log(e);
        ctx.render('statuses/new', { f: buildFormObj(status, e) });
      }
    })
    .delete('deleteStatus', '/statuses/:id/delete', async (ctx) => {
      const { id } = ctx.params;
      const status = await TaskStatus.findOne({ where: { id } });
      try {
        await status.destroy();
        ctx.redirect(router.url('statuses'));
      } catch (e) {
        console.log(e);
        ctx.render('statuses', { f: buildFormObj(status, e) });
      }
    });
};

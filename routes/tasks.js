import buildFormObj from '../lib/formObjectBuilder';
import {
  Task, Tag, TaskStatus, TagsToTasks, User,
} from '../models';

export default (router) => {
  router
    .get('tasks', '/tasks', async (ctx) => {
      try {
        const tags = await Tag.findAll();
        const taskstatus = await TaskStatus.findAll();
        const ttt = await TagsToTasks.findAll();
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
        console.log(tags);
        console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
        console.log(taskstatus);
        console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
        console.log(ttt);
        console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
        const tasks = await Task.findAll({
          include: [{ model: User, as: 'assignedTo' }, { model: User, as: 'creator' }, { model: TaskStatus, as: 'taskStatus' }],
        });
        console.log(tasks);
        ctx.flashMessage.notice = 'ALL RIGHT';
        ctx.render('tasks', { tasks });
      } catch (e) {
        console.log(e);
        ctx.render('tasks/new', { f: buildFormObj(e) });
      }
    })
    .get('newTask', '/tasks/new', (ctx) => {
      const task = Task.build();
      ctx.render('tasks/new', { f: buildFormObj(task) });
    })
    .post('createTask', '/tasks', async (ctx) => {
      const { body: { form } } = ctx.request;
      // const { name, description } = form;
      console.log(form);
      const task = Task.build(form);
      try {
        await task.save();
        ctx.flashMessage.notice = 'Task has been created';
        ctx.redirect(router.url('tasks'));
      } catch (e) {
        console.log(e);
        ctx.render('tasks/new', { f: buildFormObj(task, e) });
      }
    });
};

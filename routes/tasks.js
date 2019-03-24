import buildFormObj from '../lib/formObjectBuilder';
import {
  Task, Tag, TaskStatus, User,
} from '../models';

const getTagsId = async (tags) => {
  const normalizedTags = tags.replace(/\s/g, '').split(',');
  const tagsId = await Promise.all(normalizedTags.map(async (name) => {
    const tag = await Tag.findCreateFind({ where: { name } });
    return tag[0].id;
  }));
  return tagsId;
};

export default (router) => {
  router
    .get('tasks', '/tasks', async (ctx) => {
      const { query } = ctx.request;
      console.log(query);
      const statuses = await TaskStatus.findAll();
      const users = await User.findAll();
      const tags = await Tag.findAll();
      try {
        const tasks = await Task.findAll({
          include: [{ model: User, as: 'assignedTo' }, { model: User, as: 'creator' }, { model: TaskStatus, as: 'taskStatus' }, { model: Tag, as: 'tags' }],
        });
        // console.log(tasks);
        ctx.flashMessage.notice = 'ALL RIGHT';
        ctx.render('tasks', {
          f: buildFormObj(tasks), tasks, statuses, users, tags,
        });
      } catch (e) {
        console.log(e);
        ctx.render('tasks/new', { f: buildFormObj(e) });
      }
    })
    .get('newTask', '/tasks/new', async (ctx) => {
      const task = Task.build();
      const statuses = await TaskStatus.findAll();
      const users = await User.findAll();
      ctx.render('tasks/new', { f: buildFormObj(task), statuses, users });
    })
    .post('createTask', '/tasks', async (ctx) => {
      const { body: { form } } = ctx.request;
      form.creatorId = 1;
      const task = Task.build(form);
      try {
        const { tags } = form;
        const tagsId = getTagsId(tags);
        await task.save();
        await task.setTags(tagsId);
        ctx.flashMessage.notice = 'Task has been created';
        ctx.redirect(router.url('tasks'));
      } catch (e) {
        console.log(e);
        ctx.render('tasks/new', { f: buildFormObj(task, e) });
      }
    });
};

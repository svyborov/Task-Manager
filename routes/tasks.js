import buildFormObj from '../lib/formObjectBuilder';
import {
  Task, Tag, TaskStatus, User,
} from '../models';

const getTagsId = async (tags = '') => {
  console.log('VALUE:                   ', tags);
  const normalizedTags = tags.replace(/\s/g, '');
  console.log(normalizedTags);
  if (normalizedTags.length === 0) {
    return null;
  }
  const tagsIds = await Promise.all(normalizedTags.split(',').map(async (name) => {
    const tag = await Tag.findCreateFind({ where: { name } });
    console.log(tag);
    return tag[0].id;
  }));
  console.log(tagsIds);
  return tagsIds;
};

const scopes = {
  assignedToId: 'filterByAssignedToId',
  creatorId: 'filterByCreatorId',
  taskStatusId: 'filterByTaskStatusId',
  tagsIds: 'filterByTagsIds',
};

const createScopes = params => Object.keys(params).reduce((acc, name) => (params[name] && scopes[name] ? [...acc, { method: [scopes[name], params[name]] }] : acc), ['Assotiations']);

export default (router) => {
  router
    .get('tasks', '/tasks', async (ctx) => {
      const { query } = ctx.request;
      console.log(query);
      try {
        const tagsIds = await getTagsId(query.tags);
        console.log(query.tags);
        query.tagsIds = await tagsIds;
        console.log(query);
        const localScopes = await createScopes(query);
        console.log('ASDASDSAD', localScopes);
        const statuses = await TaskStatus.findAll();
        const users = await User.findAll();
        const tags = await Tag.findAll();
        const tasks = await Task.scope(localScopes).findAll();
        // console.log(tasks);
        ctx.flashMessage.notice = 'ALL RIGHT';
        ctx.render('tasks', {
          f: buildFormObj(tasks), tasks, statuses, users, tags,
        });
      } catch (e) {
        console.log(e);
        ctx.render('tasks', { f: buildFormObj(e) });
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
        const tagsIds = getTagsId(tags);
        await task.save();
        await task.setTags(tagsIds);
        ctx.flashMessage.notice = 'Task has been created';
        ctx.redirect(router.url('tasks'));
      } catch (e) {
        console.log(e);
        ctx.render('tasks/new', { f: buildFormObj(task, e) });
      }
    })
    .get('showTask', '/tasks/:id', async (ctx) => {
      try {
        const { id } = ctx.params;
        const task = await Task.scope('Assotiations').findByPk(id);
        ctx.render('tasks/show', { f: buildFormObj(task), task });
      } catch (e) {
        console.log(e);
        ctx.render('tasks', { f: buildFormObj(e) });
      }
    });
};

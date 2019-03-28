import request from 'supertest';
import matchers from 'jest-supertest-matchers';

import {
  makeFakeUser, makeFakeStatus, makeFakeTask, makeCookie,
} from './lib/utils';
import {
  User, TaskStatus, Task, sequelize,
} from '../models';
import app from '..';

const fakeUser = makeFakeUser();
const fakeStatus = makeFakeStatus();
const fakeTask = makeFakeTask();

describe('Task', () => {
  let server;
  let cookie;
  let user;
  let status;
  let task;

  beforeAll(async () => {
    expect.extend(matchers);
    await sequelize.sync({ force: false });
    user = await User.create(fakeUser);
    status = await TaskStatus.create(fakeStatus);
    fakeTask.creatorId = user.id;
    fakeTask.assignedToId = user.id;
    fakeTask.taskStatusId = status.id;
    task = await Task.create(fakeTask);
  });

  beforeEach(async () => {
    server = app().listen();
    cookie = await makeCookie(server, user);
  });

  it('Create task', async () => {
    const newTask = makeFakeTask();
    newTask.creatorId = user.id;
    newTask.assignedToId = user.id;
    newTask.taskStatusId = status.id;
    const res = await request.agent(server)
      .post('/tasks')
      .send({ form: newTask });

    expect(res).toHaveHTTPStatus(302);
  });

  it('Edit task', async () => {
    const changedTask = {
      name: `${task.name}_test`,
      creatorId: task.creatorId,
      assignedToId: task.assignedToId,
      taskStatusId: task.taskStatusId,
    };
    const res = await request.agent(server)
      .patch(`/tasks/${task.id}`)
      .set('Cookie', cookie)
      .send({ form: changedTask });

    expect(res).toHaveHTTPStatus(302);
  });

  it('Get /tasks/new', async () => {
    const res = await request.agent(server)
      .get('/tasks/new')
      .set('Cookie', cookie);

    expect(res).toHaveHTTPStatus(200);
  });

  it('Get /tasks', async () => {
    const res = await request.agent(server)
      .get('/tasks')
      .set('Cookie', cookie);

    expect(res).toHaveHTTPStatus(200);
  });

  it('Get wrong /tasks/:id/edit', async () => {
    const res = await request.agent(server)
      .get('/tasks/wrong/edit')
      .set('Cookie', cookie);

    expect(res).toHaveHTTPStatus(302);
  });

  it('Get /tasks/:id', async () => {
    const newFakeTask = makeFakeTask();
    newFakeTask.creatorId = user.id;
    newFakeTask.assignedToId = user.id;
    newFakeTask.taskStatusId = status.id;
    const newTask = await Task.create(newFakeTask);
    const res = await request.agent(server)
      .get(`/tasks/${newTask.id}`)
      .set('Cookie', cookie);

    expect(res).toHaveHTTPStatus(200);
  });

  it('Delete task', async () => {
    const res = await request.agent(server)
      .delete(`/tasks/${task.id}/delete`)
      .set('Cookie', cookie);

    expect(res).toHaveHTTPStatus(302);
  });

  afterEach((done) => {
    server.close();
    done();
  });
});

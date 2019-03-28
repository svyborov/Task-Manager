import request from 'supertest';
import matchers from 'jest-supertest-matchers';

import { makeFakeUser, makeFakeStatus, makeCookie } from './lib/utils';
import { User, TaskStatus, sequelize } from '../models';
import app from '..';

const fakeUser = makeFakeUser();
const fakeStatus = makeFakeStatus();

describe('TaskStatus', () => {
  let server;
  let cookie;
  let user;
  let status;

  beforeAll(async () => {
    expect.extend(matchers);
    await sequelize.sync({ force: false });
    user = await User.create(fakeUser);
    status = await TaskStatus.create(fakeStatus);
  });

  beforeEach(async () => {
    server = app().listen();
    cookie = await makeCookie(server, user);
  });

  it('Create status', async () => {
    const newStatus = makeFakeStatus();
    const res = await request.agent(server)
      .post('/statuses')
      .send({ form: newStatus });

    expect(res).toHaveHTTPStatus(302);
  });

  it('Edit status', async () => {
    const changedStatus = { name: `${status.name}_test` };
    const res = await request.agent(server)
      .patch(`/statuses/${status.id}`)
      .set('Cookie', cookie)
      .send(changedStatus);

    expect(res).toHaveHTTPStatus(302);
  });

  it('Get /statuses/new', async () => {
    const res = await request.agent(server)
      .get('/statuses/new')
      .set('Cookie', cookie);

    expect(res).toHaveHTTPStatus(200);
  });

  it('Get /statuses', async () => {
    const res = await request.agent(server)
      .get('/statuses')
      .set('Cookie', cookie);

    expect(res).toHaveHTTPStatus(200);
  });

  it('Delete status', async () => {
    const res = await request.agent(server)
      .delete(`/statuses/${status.id}/delete`)
      .set('Cookie', cookie);

    expect(res).toHaveHTTPStatus(302);
  });

  afterEach((done) => {
    server.close();
    done();
  });
});

import request from 'supertest';
import matchers from 'jest-supertest-matchers';

import { makeFakeUser, makeCookie } from './lib/utils';
import { User, sequelize } from '../models';
import app from '..';

const fakeUser = makeFakeUser();

describe('user', () => {
  let server;
  let cookie;
  let user;

  beforeAll(async () => {
    expect.extend(matchers);
    await sequelize.sync({ force: false });
    user = await User.create(fakeUser);
  });

  beforeEach(async () => {
    server = app().listen();
    cookie = await makeCookie(server, user);
  });

  it('Create user', async () => {
    const newUser = makeFakeUser();
    const res = await request.agent(server)
      .post('/users')
      .send({ form: newUser });

    expect(res).toHaveHTTPStatus(302);
  });

  it('Sign in', async () => {
    const res = await request.agent(server)
      .post('/session/new')
      .send({ form: { email: user.email, password: user.password } });

    expect(res).toHaveHTTPStatus(302);
  });

  it('Edit account', async () => {
    const changedUser = {
      firstName: `${user.firstName}_test`,
      lastName: `${user.lastName}_test`,
      email: user.email,
      password: user.password,
    };

    const res = await request.agent(server)
      .patch(`/users/${user.id}`)
      .set('Cookie', cookie)
      .send({ form: changedUser });

    expect(res).toHaveHTTPStatus(302);
  });

  it('Get /session', async () => {
    const res = await request.agent(server)
      .get('/session');

    expect(res).toHaveHTTPStatus(200);
  });

  it('Get /users/new', async () => {
    const res = await request.agent(server)
      .get('/users/new');

    expect(res).toHaveHTTPStatus(200);
  });

  it('Get /users', async () => {
    const res = await request.agent(server)
      .get('/users')
      .set('Cookie', cookie);

    expect(res).toHaveHTTPStatus(200);
  });

  it('Get wrong /users/:id/edit', async () => {
    const res = await request.agent(server)
      .get('/users/wrong/edit')
      .set('Cookie', cookie);

    expect(res).toHaveHTTPStatus(302);
  });

  it('Get /users/:id', async () => {
    const newUser = await User.create(makeFakeUser());
    const res = await request.agent(server)
      .get(`/users/${newUser.id}`)
      .set('Cookie', cookie);

    expect(res).toHaveHTTPStatus(200);
  });

  it('Delete account', async () => {
    const res = await request.agent(server)
      .delete(`/users/${user.id}/delete`)
      .set('Cookie', cookie);

    expect(res).toHaveHTTPStatus(302);
  });

  afterEach((done) => {
    server.close();
    done();
  });
});

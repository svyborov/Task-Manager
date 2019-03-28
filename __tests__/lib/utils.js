import faker from 'faker';
import request from 'supertest';

const makeFakeUser = () => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

const makeFakeTask = () => ({
  name: faker.lorem.word(),
});

const makeFakeStatus = () => ({
  name: faker.lorem.word(),
});

const makeCookie = async (server, user) => {
  const res = await request.agent(server)
    .post('/session/new')
    .send({ form: { email: user.email, password: user.password } });
  const cookie = res.headers['set-cookie'];
  return cookie;
};

export {
  makeFakeUser, makeCookie, makeFakeStatus, makeFakeTask,
};

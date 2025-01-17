const request = require('supertest');
const buildApp = require('../../app');
const UserRepo = require('../../repos/user-repo');
const pool = require('../../pool');
const Context = require('../context');

let context;
beforeAll(async () => {
  const context = await Context.build();
});

beforeEach(async () => {
  await context.reset();
});

afterAll(() => {
  return context.close();
});

it('create a user', async () => {
  const startingCount = await UserRepo.count('test-schema-a');
  expect(startingCount).toEqual(0);

  await request(buildApp())
    .post('./users')
    .send({ username: 'testuser', bio: 'test bio' })
    .expect(200);

  const finishCount = await UserRepo.count();
  expect(finishCount - startingCount).toEqual(1);
});

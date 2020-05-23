import request from 'supertest';
import { startTestDb, stopTestDb, baseUrl } from '../utils';
import app from '../../src/app';

const input = {
  firstname: 'Dennis',
  lastname: 'Anyonje',
  email: 'denniskyn80@gmail.com',
  password: '123456',
  role: 'farmer'
};
const loginCredentials = {
  email: 'denniskyn80@gmail.com',
  password: '123456'
};
beforeAll(async (done) => {
  await startTestDb();
  // app = startServer();
  request(app)
    .post(`${baseUrl}/farmer/register`)
    .send(input)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) return done(error);
      done();
    });
});

afterAll(async () => {
  await stopTestDb();
  // await app.close();
});
describe('sign in /', () => {
  test('it should sign in a user', (done) => {
    request(app)
      .post(`${baseUrl}/farmer/sign-in`)
      .send(loginCredentials)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.success).toBe(true);
        done();
      });
  });
  test('it should not sign in a user', (done) => {
    request(app)
      .post(`${baseUrl}/farmer/sign-in`)
      .send({ username: 'dennis', password: '444545' })
      .set('Accept', 'application/json')
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.success).toBe(false);
        done();
      });
  });
});

import 'jest';
import request from 'supertest';
import app from '../../src/app';
import * as email from '../../src/controller/email';

describe('/test email routes', () => {
  test('able send email using post', (done) => {
    const send = {
      ast_name: 'James',
      from: 'william.vandolah@gmail.com',
      link_address: 'www.google.com',
      manager_name: 'Steve',
      subject: 'This is because someone is testing',
      to: 'william.vandolah@gmail.com',
    };
    jest
      .spyOn(email, 'sgSend')
      .mockImplementationOnce(() => Promise.resolve(undefined));
    request(app)
      .post('/email/')
      .send(send)
      .expect(200, done);
  });
  test('receive 400 if missing a var', (done) => {
    const send = {
      ast_name: 'James',
      link_address: 'www.google.com',
      manager_name: 'Steve',
      subject: 'This is because someone is testing',
      to: 'william.vandolah@gmail.com',
    };
    jest
      .spyOn(email, 'sgSend')
      .mockImplementationOnce(() => Promise.resolve(undefined));
    request(app)
      .post('/email/')
      .send(send)
      .expect(400, done);
  });
});

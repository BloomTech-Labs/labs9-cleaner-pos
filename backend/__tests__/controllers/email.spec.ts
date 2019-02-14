import 'jest';
import request from 'supertest';
import app from '../../src/app';
import * as email from '../../src/controller/email';
import * as user from '../../src/models/users';
import { send } from '../../src/controller/email';
import { RequestMock, ResponseMock } from '../helpers';
const supertest = request(app);
// Set up 'req' and 'res' mocks
let req: RequestMock;
let res = new ResponseMock();

// Next mock captures error and stores it into this var
let nextResult: any;
// Next mock
const next = (e: Error) => {
  nextResult = e;
  return e;
};

describe('/test email routes', () => {
  beforeEach(() => {
    req = {
      body: {
        ast_name: 'James',
        manager_name: 'Steve',
        to: 'william.vandolah@gmail.com',
      },
      params: undefined,
      token: { id: 3, email: 'william.vandolah@gmail.com' },
    };
    res = new ResponseMock();
    nextResult = undefined;
  });

  test('able send email using post', async () => {
    jest
      .spyOn(email, 'sgSend')
      .mockImplementationOnce(() => Promise.resolve(undefined));
    jest
      .spyOn(user, 'getRoleId')
      .mockImplementationOnce(() => Promise.resolve(5));

    await send(req, res, next);
    const { statusValue, jsonValue } = res;

    expect(statusValue).toBe(200);
  });
  test('receive 403 if missing token', async () => {
    const sends = {
      ast_name: 'James',
      link_address: 'www.google.com',
      manager_name: 'Steve',
      subject: 'This is because someone is testing',
      to: 'william.vandolah@gmail.com',
    };
    jest
      .spyOn(email, 'sgSend')
      .mockImplementationOnce(() => Promise.resolve(undefined));
    const response = await supertest.post('/email/').send(sends);

    expect(response.status).toBe(403);
  });
});

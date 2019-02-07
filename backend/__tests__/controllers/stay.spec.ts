import 'jest';
import { get, getAll, post, put, deleteStay } from '../../src/controller/stays';
// Mocks
jest.mock('../../src/models/stays');
import * as stayModels from '../../src/models/stays';
import * as itemsModels from '../../src/models/items';
import * as usersModels from '../../src/models/users';
import { RequestMock, ResponseMock } from '../helpers';

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

describe('Stay Route Handler Functions:', () => {
  beforeEach(() => {
    req = {
      body: undefined,
      params: undefined,
    };
    res = new ResponseMock();
    nextResult = undefined;
  });

  test('GET all sends 200 upon success', async () => {
    jest
      .spyOn(stayModels, 'findAllStays')
      .mockImplementation((extit: number, filter: string) =>
        Promise.resolve({ extit, filter }),
      );
    jest
      .spyOn(usersModels, 'getRoleId')
      .mockImplementation((id: number) => Promise.resolve([1]));
    // TODO: modify test for req.token.ext_it once complete
    req.token = { ext_it: '2', id: 2, role: 'manager' };
    // Act
    await getAll(req, res, next);
    // Assert
    const { statusValue } = res;
    expect(statusValue).toBe(200);
  });

  test('GET accepts filter query', async () => {
    jest
      .spyOn(stayModels, 'findAllStays')
      .mockImplementation((extit: string, filter: string) =>
        Promise.resolve({ extit, filter }),
      );
    jest
      .spyOn(usersModels, 'getRoleId')
      .mockImplementation((id: number) => Promise.resolve([1]));
    // TODO: modify test for req.token.ext_it once complete
    req.token = { ext_it: '2', id: 2, role: 'manager' };
    req.query = { filter: 'upcoming' };
    // Act
    await getAll(req, res, next);
    // Assert
    const { statusValue, jsonValue } = res;
    expect(statusValue).toBe(200);
    expect(jsonValue.filter).toBe('upcoming');
  });

  test.skip('GET all test functionality works', async () => {
    jest
      .spyOn(stayModels, 'findAllStays')
      .mockImplementation((extit: string, filter: string) =>
        Promise.resolve({ extit, filter }),
      );
    // TODO: modify test for req.token.ext_it once complete
    req.query = { test: 'true' };
    // Act
    await getAll(req, res, next);
    // Assert
    const { statusValue, jsonValue } = res;
    expect(statusValue).toBe(200);
    expect(jsonValue.extit).toBe('1');
    expect(jsonValue.filter).toBe('all');
  });

  test('GET all properly sends error reponse', async () => {
    jest
      .spyOn(stayModels, 'findAllStays')
      .mockImplementation(() => Promise.reject(new Error('test')));
    // TODO: modify test for req.token.ext_it once complete
    req.query = { extit: 1 };
    req.token = { ext_it: '2', id: 2 };
    // Act
    await getAll(req, res, next);
    // Assert
    const { statusCode, message } = nextResult;
    expect(statusCode).toBe(400);
    expect(message).toBe('test');
  });

  test('GET by id retrieves stay summary', async () => {
    // Arrange
    jest
      .spyOn(stayModels, 'findStaySummaryStandardized')
      .mockImplementationOnce(() => Promise.resolve(true));
    req.params = { id: 1 };
    // Act
    await get(req, res, next);
    // Assert
    const { statusValue, jsonValue } = res;
    expect(statusValue).toBe(200);
    expect(jsonValue).toBeTruthy();
  });

  test('GET by id sends out 404 if not found', async () => {
    // Arrange
    jest
      .spyOn(stayModels, 'findStaySummary')
      .mockImplementationOnce(() => Promise.resolve(undefined));
    req.params = { id: 1 };
    // Act
    await get(req, res, next);
    // Assert
    const { statusCode, message } = nextResult;
    expect(statusCode).toBe(404);
    expect(message).toBe('Stay with given ID 1 not found.');
  });

  test('POST gives 201 upon successful insert', async () => {
    // Arrange
    jest
      .spyOn(stayModels, 'postStayData')
      .mockImplementationOnce(() => Promise.resolve([1]));
    jest
      .spyOn(itemsModels, 'postItemsStay')
      .mockImplementationOnce(() => Promise.resolve(1));
    req.body = {
      guest_id: 1,
      house_id: 1,
    };
    // Act
    await post(req, res, next);
    // Assert
    const { statusValue, jsonValue } = res;
    expect(statusValue).toBe(201);
    expect(jsonValue).toEqual(expect.arrayContaining([1]));
  });

  test('POST rejects empty body', async () => {
    // Act
    await post(req, res, next);
    // Assert
    const { statusValue, jsonValue } = res;
    expect(statusValue).not.toBe(201);
    expect(jsonValue).not.toEqual(expect.arrayContaining([1]));
    const { statusCode } = nextResult;
    expect(statusCode).toBe(400);
  });

  test('PUT responds to successful request', async () => {
    // Arrange
    jest
      .spyOn(stayModels, 'putStayData')
      .mockImplementationOnce(() => Promise.resolve(1));
    req.body = {
      guest_id: 1,
      house_id: 1,
    };
    req.params = { id: 1 };
    // Act
    await put(req, res, next);
    // Assert
    const { sendValue, statusValue } = res;
    expect(statusValue).toBe(200);
  });

  test('DELETE responds to successful request', async () => {
    // Arrange
    jest
      .spyOn(stayModels, 'deleteStayData')
      .mockImplementationOnce(() => Promise.resolve(1));
    req.params = { id: 1 };
    // Act
    await deleteStay(req, res, next);
    // Assert
    const { sendValue, statusValue } = res;
    // expect(statusValue).toBe(200);
    expect(sendValue).toBe(1);
  });
});

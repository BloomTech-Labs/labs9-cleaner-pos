import 'jest';
import { get, post, put, deleteStay } from '../../src/controller/stays';
// Mocks
jest.mock('../../src/models/stays');
import * as stayModels from '../../src/models/stays';
import * as itemsModels from '../../src/models/items';
export interface RequestMock {
  params?: any;
  body?: any;
}

export class ResponseMock {
  public jsonValue: any;
  public sendValue: string | undefined;
  public statusValue: number | undefined;
  constructor() {
    this.jsonValue = undefined;
    this.sendValue = undefined;
    this.statusValue = undefined;
  }

  public json(json: any) {
    this.jsonValue = json;
    return json;
  }

  public send(msg: string) {
    this.sendValue = msg;
    return MSGesture;
  }

  public status(status: number) {
    this.statusValue = status;
    return this;
  }
}

let req: RequestMock;
let res = new ResponseMock();
let nextResult: any;

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

  test('GET by id retrieves stay summary', async () => {
    // Arrange
    jest
      .spyOn(stayModels, 'findStaySummary')
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
    expect(statusValue).toBe(201);
    expect(sendValue).toBe(1);
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

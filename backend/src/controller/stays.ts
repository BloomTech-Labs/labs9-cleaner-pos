// Dependencies
import {
  deleteStayData,
  findStaySummary,
  findStaySummaryStandardized,
  findAllStays,
  postStayData,
  putStayData,
} from '../models/stays';
import { getRoleId } from '../models/users';
import { findAstMan } from '../models/assistants';
// Type Definitions
import { Request, Response, NextFunction } from 'express';
import { RequestMock, ResponseMock } from '../../__tests__/helpers';
import { QueryBuilder } from 'knex';
import { Stay } from '../interface';
import { postItemsStay } from '../models/items';

type NextFunctionMock = (a: any) => any;

type Requests = Request | RequestMock;
type Responses = Response | ResponseMock;
type Nexts = NextFunction | NextFunctionMock;

// Stay Route Handler Functions
export async function get(
  req: Requests,
  res: Responses,
  next: Nexts,
): Promise<void> {
  const { id } = req.params;

  try {
    const summary: QueryBuilder = await findStaySummaryStandardized(id);
    if (summary === undefined) {
      const e: any = new Error(`Stay with given ID ${id} not found.`);
      e.statusCode = 404;
      throw e;
    }
    res.status(200).json(summary);
  } catch (e) {
    e.statusCode = e.statusCode || 400;
    next(e);
  }
}

export async function getAll(
  req: Requests,
  res: Responses,
  next: Nexts,
): Promise<void> {
  const test = req.query && req.query.test;
  const filter = req.query && req.query.filter ? req.query.filter : 'all';
  // If test query is true, set extit to '1'
  const extit = test !== 'true' ? req.token && req.token.id : '1';

  if (!extit) {
    next({ ...new Error('Authentication Required'), statusCode: 403 });
  }

  try {
    const { id, role } = req.token;
    // const stays = await findAllStays(String(extit), filter);
    let stays: any;
    if (role === 'assistant') {
      // if user is an assistant, we find ast_id, find all asigned managers
      const ast = await getRoleId(id, true);
      const astMan = await findAstMan(ast.id);
      stays = await findAllStays(astMan, filter, ast.id);
    } else {
      const manager = await getRoleId(id);
      stays = await findAllStays([manager.id], filter);
    }
    res.status(200).json(stays);
  } catch (e) {
    e.statusCode = e.statusCode || 400;
    next(e);
  }
}

export async function post(req: Requests, res: Responses, next: Nexts) {
  try {
    const dataToBeSent = validateStayPost(req.body);
    const ids = await postStayData(dataToBeSent);
    await postItemsStay(ids[0]);
    // TODO: when using postgres this if statment will never fire.
    if (ids.length === 0) {
      const e: any = new Error('Stay POST unsuccessful');
      e.statusCode = 500;
      throw e;
    }
    res.status(201).json(ids);
  } catch (e) {
    if (e.statusCode === undefined) {
      e.statusCode = 400;
    }
    next(e);
  }
}

export async function put(req: Requests, res: Responses, next: Nexts) {
  try {
    const stayId = req.params.id;
    const dataToBeSent = validateStayPost(req.body);
    const count = await putStayData(stayId, dataToBeSent);
    if (count === 0) {
      const e: any = new Error('Stay PUT unsuccessful');
      e.statusCode = 500;
      throw e;
    }
    res.status(200).json({ count });
  } catch (e) {
    if (e.statusCode === undefined) {
      e.statusCode = 400;
    }
    next(e);
  }
}

export async function deleteStay(req: Requests, res: Responses, next: Nexts) {
  try {
    const stayId = req.params.id;
    const count = await deleteStayData(stayId);
    if (count === 0) {
      const e: any = new Error('DELETE unsuccessful');
      e.statusCode = 500;
      throw e;
    }
    res.status(200).send(count);
  } catch (e) {
    if (e.statusCode === undefined) {
      e.statusCode = 400;
    }
    next(e);
  }
}

// Helper function
function validateStayPost(body: any) {
  let error: boolean = false;
  let errorString = '';
  if (body === undefined) {
    const e: any = new Error('Request body is required.');
    e.statusCode = 400;
    throw e;
  }
  if (!body.guest_id || !body.house_id) {
    error = true;
    errorString += 'guest_id and house_id fields are required.\n';
  }
  if (body.check_in && typeof body.check_in !== 'string') {
    error = true;
    errorString += 'check_in must be type string.\n';
  }
  if (body.extra_guests && typeof body.extra_guests !== 'number') {
    error = true;
    errorString += 'extra_guests must be type number\n';
  }
  if (
    (body.check_in && typeof body.check_in !== 'string') ||
    (body.check_out && typeof body.check_out !== 'string')
  ) {
    error = true;
    errorString += 'check_in and check_out must be type string.\n';
  }
  if (body.url_id && typeof body.url_id !== 'string') {
    error = true;
    errorString += 'url_id must be type string.\n';
  }
  if (error === true) {
    const e: any = new Error(errorString);
    e.statusCode = 400;
    throw e;
  }

  return body;
}

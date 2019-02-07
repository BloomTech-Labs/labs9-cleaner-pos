import {
  findHouse,
  findHouses,
  makeHouse,
  updateHouse,
  deleteHouse,
  findAllHousesByAstId,
  findAllHousesByManagerId,
} from '../models/houses';
import { postList } from '../models/lists';
import { findUserByExt_it, findUser, getRoleId } from '../models/users';
import { findAstMan, addAstToHouse } from '../models/assistants';
import { Request, Response, NextFunction } from 'express';
import { House } from '../interface';

// TODO: Refactor GET
export const get = async (req: Request, res: Response, next: NextFunction) => {
  // const user = req.query && req.query.user;
  // const manager = req.query && req.query.manager;
  // const test = req.query && req.query.test;

  // if (user) {
  //   try {
  //     const { id } = req.params;

  //     const result = await findAllHousesByAstId(Number(id));

  //     return res.status(200).json(result);
  //   } catch (e) {
  //     e.statusCode = e.statusCode || 500;
  //     return next(e);
  //   }
  // } else if (manager) {
  //   try {
  //     let extIt: string;

  //     if (test) {
  //       extIt = '1';
  //     } else {
  //       const token = req.token;
  //       if (!token) {
  //         throw { ...new Error('Authentication required'), statusCode: 403 };
  //       }
  //       extIt = req.token.ext_it;
  //     }

  //     const { id } = await findUserByExt_it(extIt);
  //     const result = await findAllHousesByManagerId(id);
  //     return res.status(200).json(result);
  //   } catch (e) {
  //     e.statusCode = e.statusCode || 500;
  //     return next(e);
  //   }
  // }

  // TODO: limit the ablity to get a house by id if your are not the manager or ast of house
  try {
    const { id } = req.params;
    let house: any;
    if (id) {
      house = await findHouse(id);
    } else {
      // check role. if ast, find all manager id's linked
      if (req.token.role === 'assistant') {
        const ast = await getRoleId(req.token.id, true);
        const astMan = await findAstMan(ast.id);
        house = await findHouses(astMan, ast.id);
      } else {
        const manager = await getRoleId(req.token.id);
        house = await findHouses([manager.id]);
      }
    }
    if (house === undefined) {
      throw Error('no user');
    }
    res.status(200).json(house);
  } catch (e) {
    e.statusCode = 404;
    next(e);
  }
};

export const post = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.token;

    // TODO: I don't think we need any of this code anymore
    // let extIt: string;

    // if (req.query && req.query.test) {
    //   // If req.query.test exists (i.e. ?test=true)
    //   // set extIt to 1
    //   extIt = '1';
    // } else {
    //   // Else, get the extIt from the token itself
    //   if (!token) {
    //     throw { ...new Error('Not authenticated'), statusCode: 403 };
    //   }
    //   extIt = req.token.ext_it;
    // }

    // const { id } = await findUserByExt_it(extIt);

    const { id } = await getRoleId(token.id);
    const house: House = { ...req.body, manager: id };
    const newHouse = await makeHouse(house);
    await postList({ type: 'before', house_id: newHouse[0] });
    await postList({ type: 'during', house_id: newHouse[0] });
    await addAstToHouse(newHouse[0], req.body.default_ast);
    res.status(201).json(newHouse);
  } catch (e) {
    console.error(e);
    e.statusCode = e.statusCode || 400;
    next(e);
  }
};

export const put = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const house: House = { ...req.body, id: req.params.id };
    if (house.default_ast === null) {
      const manAst = await getRoleId(req.token.id, true);
      house.default_ast = manAst.id;
    }
    const putHouse = await updateHouse(house);
    if (!putHouse) {
      throw Error('No house with that id');
    }
    res.status(201).json(putHouse);
  } catch (e) {
    e.statusCode = 404;
    next(e);
  }
};

export const deleteU = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const delUser = await deleteHouse(id);
    res.status(200).json(delUser);
  } catch (e) {
    e.statusCode = 400;
    next(e);
  }
};

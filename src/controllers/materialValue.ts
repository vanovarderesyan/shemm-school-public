import * as HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import config from '../config/config';
import * as materialValueService from '../services/materialValueService';
import MaterialValuePayload from '../domain/requests/MaterialValuePayload';
import PaginetPayload  from '../domain/requests/PaginetPayload';

const { messages } = config;

/**
 * Handle /users GET request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function index(req: Request, res: Response, next: NextFunction) {
  try {
    const params = Object(req.params) as PaginetPayload;

    const response = await materialValueService.fetchAll(params.limit,params.offset);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: messages.materialValue.fetchAll
    });
  } catch (err) {
    next(err);
  }
}

export async function count(_:Request,res:Response,next:NextFunction):Promise<void>{

    

  try {
      const response = await materialValueService.count();
      
      res.status(HttpStatus.OK).json({
          code:HttpStatus.OK,
          data:response,
          message:messages.materialValue.count
      })

  } catch (error) {
      next(error);
  }

}


/**
 * Handle /users POST request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function store(req: Request, res: Response, next: NextFunction) {
  try {
    const materialValuePayload = req.body as MaterialValuePayload;

    const response = await materialValueService.insert(materialValuePayload);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: messages.materialValue.insert
    });
  } catch (err) {
    next(err);
  }
}


export async function getOne(req: Request, res: Response, next: NextFunction): Promise<void> {

  try {
      const id: number = Number(req.params.id);

      const response = await materialValueService.getById(id);

      res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data: response,
          message: messages.materialValue.fetch
      })

  } catch (error) {
      next(error);
  }
}


export async function destroy(req: Request, res: Response, next: NextFunction): Promise<void> {

  try {
      const id: number = Number(req.params.id);

      const response = (await materialValueService.destroy(id));

      res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data: response,
          message: messages.materialValue.delete
      })

  } catch (error) {
      next(error);
  }
}


export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {

  try {
      const id: number = Number(req.params.id);
      const partnersPayload = req.body as MaterialValuePayload;

      const response = (await materialValueService.update(id,partnersPayload));

      res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data: response,
          message: messages.materialValue.edit
      })

  } catch (error) {
      next(error);
  }
}
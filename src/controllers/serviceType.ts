import * as HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import config from '../config/config';
import * as serviceTypeService from '../services/serviceTypeService';
import ServiceTypePayload from '../domain/requests/ServiceTypePayload';

const { messages } = config;

/**
 * Handle /users GET request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function index(_: Request, res: Response, next: NextFunction) {
  try {
    const response = await serviceTypeService.fetchAll();

    console.log('***********')
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: messages.serviceType.fetchAll
    });
  } catch (err) {
    next(err);
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
    const serviceTypePayload = req.body as ServiceTypePayload;

    const response = await serviceTypeService.insert(serviceTypePayload);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: messages.serviceType.insert
    });
  } catch (err) {
    next(err);
  }
}

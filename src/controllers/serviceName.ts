import * as HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import config from '../config/config';
import * as serviceNameService from '../services/serviceNameService';
import ServiceNamePayload from '../domain/requests/ServiceNamePayload';

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
    const response = await serviceNameService.fetchAll();

    console.log('***********')
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: messages.serviceName.fetchAll
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
    const serviceNamePayload = req.body as ServiceNamePayload;

    const response = await serviceNameService.insert(serviceNamePayload);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: messages.serviceName.insert
    });
  } catch (err) {
    next(err);
  }
}

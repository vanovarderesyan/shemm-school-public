import * as HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import config from '../config/config';
import * as bankService from '../services/bankService';
import BankPayload from '../domain/requests/BankPayload';

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
    const response = await bankService.fetchAll();

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: messages.bank.fetchAll
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
    const bankPayload = req.body as BankPayload;

    const response = await bankService.insert(bankPayload);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: messages.bank.insert
    });
  } catch (err) {
    next(err);
  }
}

import * as HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import config from '../config/config';
import * as bankBrancheService from '../services/bankBrancheService';
import BankBranchePayload from '../domain/requests/BankBranchePayload';

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
    const response = await bankBrancheService.fetchAll();

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: messages.bankBranche.fetchAll
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
    const bankBranchePayload = req.body as BankBranchePayload;

    const response = await bankBrancheService.insert(bankBranchePayload);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: messages.bankBranche.insert
    });
  } catch (err) {
    next(err);
  }
}

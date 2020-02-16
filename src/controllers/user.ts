import * as HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import config from '../config/config';
import * as userService from '../services/userService';
import UserPayload from '../domain/requests/UserPayload';
import ResetPayload from '../domain/requests/ResetPayload';
import CheckTokenPayload from '../domain/requests/CheckTokenPayload';
import ResetPasswordPayload from '../domain/requests/ResetPasswordPayload';



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
    const response = await userService.fetchAll();

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: messages.users.fetchAll
    });
  } catch (err) {
    next(err);
  }
}


/**
 * Handle /users GET request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function me(_: Request, res: Response, next: NextFunction) {
  try {
    console.log(res.locals.loggedInPayload, '-------------')
    const response = await userService.me(res.locals);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: messages.users.me
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Handle /users PUT request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    console.log(res.locals.loggedInPayload, '-------------')
    const userPayload = req.body as UserPayload;
    const response = await userService.update(res.locals,userPayload);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: messages.users.update
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
    const userPayload = req.body as UserPayload;

    const response = await userService.insert(userPayload);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: messages.users.insert
    });
  } catch (err) {
    next(err);
  }
}


/**
 * Handle /users POST admin  request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function storeAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const userPayload = req.body as UserPayload;

    const response = await userService.insertAdmin(userPayload);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: messages.users.insert
    });
  } catch (err) {
    console.log(err)
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
export async function resetPassword(req: Request, res: Response, next: NextFunction) {
  try {
    const resetPayload = req.body as ResetPayload;

    const response = await userService.resetPassword(resetPayload);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: messages.users.insert
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
export async function checkToken(req: Request, res: Response, next: NextFunction) {
  try {
    const checkTokenPayload = req.body as CheckTokenPayload;

    const response = await userService.checkToken(checkTokenPayload['token']);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: messages.users.insert
    });
  } catch (err) {
    next(err);
  }
}

export async function checkTokenLong(req: Request, _: Response, next: NextFunction) {
  try {
    const checkTokenPayload = req.body as ResetPasswordPayload;

    await userService.checkTokenLong(checkTokenPayload['token']);

    next()
  } catch (err) {
    next(err);
  }
}

export async function newPassword(req: Request, res: Response, next: NextFunction) {
  try {
    const resetPasswordPayload = req.body as ResetPasswordPayload;

    const response = await userService.newPassword(resetPasswordPayload);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: messages.users.insert
    });
 
  } catch (err) {
    next(err);
  }
}
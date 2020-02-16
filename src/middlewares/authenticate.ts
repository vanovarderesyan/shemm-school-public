import { Request, Response, NextFunction } from 'express';

import * as jwt from '../utils/jwt';
import logger from '../utils/logger';
import config from '../config/config';
import ErrorType from './../resources/enums/ErrorType';
import BadRequestError from '../exceptions/BadRequestError';
import UnauthorizedError from '../exceptions/UnauthorizedError';
import Role from "../resources/enums/Role";

const { errors } = config;

const tokenErrorMessageMap: any = {
  [ErrorType.INVALID]: errors.invalidToken,
  [ErrorType.EXPIRED]: errors.accessTokenExpired
};

/**
 * A middleware to authenticate the authorization token i.e. access token.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    res.locals.accessToken = String(req.headers.authorization).replace('Bearer ', '');

    if (!req.headers.authorization || !res.locals.accessToken) {
      throw new UnauthorizedError(errors.noToken);
    }

    logger.log('info', 'JWT: Verifying token - %s', res.locals.accessToken);
    const response: any = jwt.verifyAccessToken(res.locals.accessToken);

    res.locals.loggedInPayload = response.data;

    logger.log('debug', 'JWT: Authentication verified -', res.locals.loggedInPayload);

    next();
  } catch (err) {
    const tokenErrorMessage = tokenErrorMessageMap[err.name];
    logger.log('error', 'JWT: Authentication failed - %s', err.message);

    if (tokenErrorMessage) {
      logger.log('error', 'JWT: Token error - %s', tokenErrorMessage);

      next(new UnauthorizedError(tokenErrorMessage));
    } else {
      next(err);
    }
  }
}


/**
 * A middleware to authenticate the authorization token i.e. access token.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function authenticateAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    res.locals.accessToken = String(req.headers.authorization).replace('Bearer ', '');

    if (!req.headers.authorization || !res.locals.accessToken) {
      throw new BadRequestError(errors.noToken);
    }

    logger.log('info', 'JWT: Verifying token - %s', res.locals.accessToken);
    const response: any = jwt.verifyAccessToken(res.locals.accessToken);

    res.locals.loggedInPayload = response.data;


    logger.log('debug', 'JWT: Authentication verified -', res.locals.loggedInPayload);


    if(response.data.roleId = Role.ADMIN){
      next();
    }else{
      throw new Error('Authentication failed');
      
    }


  } catch (err) {
    const tokenErrorMessage = tokenErrorMessageMap[err.name];
    logger.log('error', 'JWT: Authentication failed - %s', err.message);

    if (tokenErrorMessage) {
      logger.log('error', 'JWT: Token error - %s', tokenErrorMessage);

      next(new UnauthorizedError(tokenErrorMessage));
    } else {
      next(err);
    }
  }
}


export  {
  authenticate,
  authenticateAdmin
};

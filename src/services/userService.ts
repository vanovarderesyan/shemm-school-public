import User from "../models/User";
import logger from "../utils/logger";
import * as bcrypt from "../utils/bcrypt";
import * as object from "../utils/object";
import transform from "../utils/transform";
import Role from "../resources/enums/Role";
import UserDetail from "../domain/entities/UserDetail";
import UserPayload from "../domain/requests/UserPayload";
import ResetPasswordPayload from "../domain/requests/ResetPasswordPayload";

import ResetPayload from "../domain/requests/ResetPayload";
import * as jwt from '../utils/jwt';
import UnauthorizedError from '../exceptions/UnauthorizedError';
import UniqueUserError from '../exceptions/UniqueUserError';

import config from '../config/config';
import ErrorType from './../resources/enums/ErrorType';

const { errors } = config;
import * as mail from '../utils/mail';

const tokenErrorMessageMap: any = {
  [ErrorType.INVALID]: errors.invalidToken,
  [ErrorType.EXPIRED]: errors.refreshTokenExpired
};


/**
 * Fetch all users from users table.
 *
 * @returns {Promise<UserDetail[]>}
 */
export async function fetchAll(): Promise<UserDetail[]> {
  logger.log("info", "Fetching users from database");

  const users = await User.fetchAll();
  const res = transform(users.serialize(), (user: UserDetail) => ({
    name: user.name,
    email: user.email,
    roleId: user.roleId,
    updatedAt: new Date(user.updatedAt).toLocaleString(),
    createdAt: new Date(user.updatedAt).toLocaleString()
  }));

  logger.log("debug", "Fetched all users successfully:", res);

  return res;
}

/**
 * Fetch  user by id  from users table.
 *
 * @returns {Promise<UserDetail[]>}
 */

export async function me(data: { loggedInPayload: any }): Promise<UserDetail> {
  logger.log("info", "Fetching users from database");
  const id = data.loggedInPayload["userId"];
  const users = await new User({ id: id }).fetch({ withRelated: ["role"] });
  const user = users.serialize();
  const res = {
    name: user.name,
    email: user.email,
    roleId: user.roleId,
    role: user.role,
    updatedAt: new Date(user.updatedAt).toLocaleString(),
    createdAt: new Date(user.updatedAt).toLocaleString()
  };
  return res;
}

/**
 * update  user by id  from users table.
 *
 * @returns {Promise<UserDetail[]>}
 */

export async function update(data: { loggedInPayload: any }, params: UserPayload): Promise<UserDetail> {
  logger.log("info", "Fetching users from database");
  const id = data.loggedInPayload["userId"];
  const users = (
    await new User({ id: id }).where({ id: id }).save({ ...params })
  ).serialize();

  const res = {
    name: users.name,
    email: users.email,
    roleId: users.roleId,
    role: users.role,
    updatedAt: new Date(users.updatedAt).toLocaleString(),
    createdAt: new Date(users.updatedAt).toLocaleString()
  };
  return res;
}


/**
 * forget password.
 *
 * @returns {Promise<UserDetail[]>}
 */

export async function resetPassword(params: ResetPayload): Promise<string> {
  logger.log("info", "Fetching users from database");
  // const id = data.loggedInPayload["userId"];
  const users = await new User({ email: params.email }).fetch({ withRelated: ["role"] })

  if (!users) {
    throw new UnauthorizedError(errors.invalidCredentials);
  }

  const user = users.serialize()

  const token = jwt.generateAccessTokenForReset(user)
  // const res = {
  //   name: users.name,
  //   email: users.email,
  //   roleId: users.roleId,
  //   role: users.role,
  //   updatedAt: new Date(users.updatedAt).toLocaleString(),
  //   createdAt: new Date(users.updatedAt).toLocaleString()
  // };
  let url = `http://192.168.1.112:5500/auth/verify?verify=${token}`


  try {
    await mail.send({
      to: params['email'],
      subject: 'reset password',
      markdown: `click this url  <a href="${url}">reset!</a>`
    });

    return " ok"
  } catch (err) {
    console.log(err)
    process.exit(1);
  }
}

export async function checkToken(token: string): Promise<any> {
  try {
    const response: any = jwt.verifyRefreshToken(token)
    const _token = jwt.generateAccessTokenForResetLong(response)

    return { token: _token };
  } catch (err) {
    const tokenErrorMessage = tokenErrorMessageMap[err.name];
    logger.log('error', 'JWT: Authentication failed - %s', err.message);

    if (tokenErrorMessage) {
      logger.log('error', 'JWT: Token error - %s', tokenErrorMessage);

      throw (new UnauthorizedError(tokenErrorMessage));
    }
  }
}

export async function checkTokenLong(token: string): Promise<any> {
  try {
    jwt.verifyRefreshToken(token)
    return 'ok';
  } catch (err) {
    const tokenErrorMessage = tokenErrorMessageMap[err.name];
    logger.log('error', 'JWT: Authentication failed - %s', err.message);

    if (tokenErrorMessage) {
      logger.log('error', 'JWT: Token error - %s', tokenErrorMessage);

      throw (new UnauthorizedError(tokenErrorMessage));
    }
  }
}

export async function newPassword(params: ResetPasswordPayload): Promise<UserDetail> {
  logger.log("info", "Inserting user into database:", params);

  const tokenData: any = jwt.verifyRefreshToken(params['token'])
  const password = await bcrypt.hash(params.password);
  const user = (
    await new User().where({ id: tokenData.data.data.id }).save({ password }, { patch: true })
  ).serialize();

  logger.log("debug", "Inserted user successfully:", user);

  return object.camelize(user);
}




/**
 * Insert user from given user payload
 *
 * @param {UserPayload} params
 * @returns {Promise<UserDetail>}
 */
export async function insert(params: UserPayload): Promise<UserDetail> {
  logger.log('info', 'Inserting user into database:', params);
  const users = await new User({ email: params['email'] }).fetch({ withRelated: ["role"] })
  console.log(users, '-------------')
  if (users) {
    throw "unique email";
  }

  const password = await bcrypt.hash(params.password);
  const user = (await new User({ ...params, password, roleId: Role.NORMAL_USER }).save()).serialize();

  logger.log('debug', 'Inserted user successfully:', user);

  return object.camelize(user);
}


/**
 * Insert admin user from given user payload
 *
 * @param {UserPayload} params
 * @returns {Promise<UserDetail>}
 */
export async function insertAdmin(params: UserPayload): Promise<UserDetail> {
  logger.log('info', 'Inserting user into database:', params);

  const users = await new User({ email: params['email'] }).fetch({ withRelated: ["role"] })
  console.log(users, '-------------')
  if (users) {
    throw new UniqueUserError(errors.uniqueEmail);
  }


  const password = await bcrypt.hash(params.password);
  const user = (await new User({ ...params, password, roleId: Role.ADMIN }).save()).serialize();

  logger.log('debug', 'Inserted user successfully:', user);

  return object.camelize(user);
}

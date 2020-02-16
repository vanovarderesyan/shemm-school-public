import Bank from '../models/Bank';
import logger from '../utils/logger';
import * as object from '../utils/object';

import transform from '../utils/transform';
import BankDetail from '../domain/entities/BankDetail';
import BankPayload from '../domain/requests/BankPayload';

/**
 * Fetch all users from users table.
 *
 * @returns {Promise<BankDetail[]>}
 */
export async function fetchAll(): Promise<BankDetail[]> {
  logger.log('info', 'Fetching users from database');

  const banks = await Bank.fetchAll();
  const res = transform(banks.serialize(), (bank: BankPayload) => ({
    name: bank.name,

    // updatedAt: new Date(user.updatedAt).toLocaleString(),
    // createdAt: new Date(user.updatedAt).toLocaleString()
  }));

  logger.log('debug', 'Fetched all users successfully:', res);

  return res;
}

/**
 * Insert user from given user payload
 *
 * @param {BankPayload} params
 * @returns {Promise<BankDetail>}
 */
export async function insert(params: BankPayload): Promise<BankDetail> {



    const bank = (await new Bank({ ...params}).save()).serialize();
  
    logger.log('debug', 'Inserted user successfully:', bank);
  
    return object.camelize(bank);
 
}

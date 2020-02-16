import BankBranche from '../models/BankBranche';
import logger from '../utils/logger';
import * as object from '../utils/object';

import transform from '../utils/transform';
import BankBrancheDetail from '../domain/entities/BankBrancheDetail';
import BankBranchePayload from '../domain/requests/BankBranchePayload';

/**
 * Fetch all users from users table.
 *
 * @returns {Promise<BankBrancheDetail[]>}
 */
export async function fetchAll(): Promise<BankBrancheDetail[]> {
  logger.log('info', 'Fetching users from database');

  const banks = await BankBranche.fetchAll();
  const res = transform(banks.serialize(), (bankBranche: BankBranchePayload) => ({
    bankId: bankBranche.bankId,
    brancheCode: bankBranche.brancheCode,
    brancheAddress: bankBranche.brancheAddress
    // updatedAt: new Date(user.updatedAt).toLocaleString(),
    // createdAt: new Date(user.updatedAt).toLocaleString()
  }));

  logger.log('debug', 'Fetched all users successfully:', res);

  return res;
}

/**
 * Insert user from given user payload
 *
 * @param {UserPayload} params
 * @returns {Promise<BankBrancheDetail>}
 */
export async function insert(params: BankBranchePayload): Promise<BankBrancheDetail> {

  const bank = (await new BankBranche({ ...params }).save()).serialize();

  logger.log('debug', 'Inserted user successfully:', bank);

  return object.camelize(bank);

}

// export async function getOne(id: number): Promise<BankBrancheDetail> {

//   const bank = (await new BankBranche({ id: id }).fetch({withRelated:}))

// }

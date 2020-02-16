import MaterialValue from '../models/MaterialValue';
import logger from '../utils/logger';
import * as object from '../utils/object';

import transform from '../utils/transform';
import MaterialValueDetail from '../domain/entities/MaterialValueDetail';
import MaterialValuePayload from '../domain/requests/MaterialValuePayload';
import NotFoundError from '../exceptions/NotFoundError';
import config from '../config/config';

const { errors } = config;


/**
 * Fetch all users from users table.
 *
 * @returns {Promise<MaterialValueDetail[]>}
 */
export async function fetchAll(limit: number, offset: number): Promise<MaterialValueDetail[]> {
  logger.log('info', 'Fetching users from database');



  const _materialValues = await MaterialValue.fetchAll()
  const materialValues = await (_materialValues).query((qb) => {
      qb.limit(limit),
          qb.offset(offset)
  }).fetch()
  const res = transform(materialValues.serialize(), (materialValue: MaterialValueDetail) => ({
    accountId : materialValue.accountId,
    barCode : materialValue.barCode,
    billingMethodId : materialValue.billingMethodId,
    characteristic : materialValue.characteristic,
    classificationId : materialValue.classificationId,
    currencyId : materialValue.currencyId,
    externalCode : materialValue.externalCode,
    hcbCoefficient: materialValue.hcbCoefficient,
    isAah :materialValue.isAah,
    materialValueGroupId: materialValue.materialValueGroupId,
    measurementUnitId : materialValue.measurementUnitId,
    name : materialValue.name,
    retailRevenueAccountId : materialValue.retailRevenueAccountId,
    salesExpenseAccountId : materialValue.salesExpenseAccountId,
    retailerPrice : materialValue.retailerPrice,
    salesRevenueAccountId : materialValue.salesExpenseAccountId,
    wholesalePrice : materialValue.wholesalePrice,
    wholesalePriceCurrency : materialValue.wholesalePriceCurrency,
    id : materialValue.id

    // updatedAt: new Date(user.updatedAt).toLocaleString(),
    // createdAt: new Date(user.updatedAt).toLocaleString()
  }));

  logger.log('debug', 'Fetched all users successfully:', res);

  return res;
}

export async function count(): Promise<object> {
  const count = await (await MaterialValue.fetchAll()).count();
  return { count }
}

/**
 * Insert user from given user payload
 *
 * @param {MaterialValuePayload} params
 * @returns {Promise<ClassificationDetail>}
 */
export async function insert(params: MaterialValuePayload): Promise<MaterialValueDetail> {



    const materialValue = (await new MaterialValue({ ...params}).save()).serialize();
  
    logger.log('debug', 'Inserted user successfully:', materialValue);
  
    return object.camelize(materialValue);
 
}


export async function getById(id: number): Promise<MaterialValueDetail> {

  const position = (await new MaterialValue({ id: id }).fetch({ withRelated: ['billingAccounts', 'additionalAddressePartners'] }));

  if (position) {
      return position.serialize();
  }
  else {
      throw new NotFoundError(errors.notFound);
  }
}

export async function destroy(id: number): Promise<MaterialValueDetail> {

  const res = (await new MaterialValue({ id: id }).destroy()).serialize();

  return res;
}


export async function update(id: number, params: MaterialValuePayload): Promise<MaterialValueDetail> {

  // const billingAccounts = params['billingAccounts'];
  // const additionalAddressePartners = params['additionalAddressePartners']

  // delete params['additionalAddressePartners']
  // delete params['billingAccounts'];

  // const partnersId = id;

  // for (const billingAccount of billingAccounts) {
  //     billingAccount['partnersId'] = partnersId;
  //     try {
  //         console.log(billingAccount);
  //         if (billingAccount['id'] && !billingAccount['isDeleted']) {
  //             (await new BillingAccount().where({ id: billingAccount['id'] }).save({ ...billingAccount }, { patch: true })).serialize();
  //         } else if (billingAccount['id'] && billingAccount['isDeleted']) {
  //             (await new BillingAccount({ id: billingAccount['id'] }).destroy()).serialize();
  //         } else {
  //             (await new BillingAccount({ ...billingAccount }).save()).serialize();
  //         }
  //     } catch (error) {
  //         console.log(error)
  //     }
  // }

  // for (const additionalAddressePartner of additionalAddressePartners) {
  //     additionalAddressePartner['partnersId'] = partnersId;
  //     try {
  //         if (additionalAddressePartner['id'] && !additionalAddressePartner['isDeleted']) {
  //             (await new AdditionalAddressePartners().where({ id: additionalAddressePartner['id'] }).save({ ...additionalAddressePartner }, { patch: true })).serialize();
  //         } else if (additionalAddressePartner['id'] && additionalAddressePartner['isDeleted']) {
  //             (await new AdditionalAddressePartners({ id: additionalAddressePartner['id'] }).destroy()).serialize();
  //         } else {
  //             (await new AdditionalAddressePartners({ ...additionalAddressePartner }).save()).serialize();
  //         }
  //     } catch (error) {
  //         console.log(error)
  //     }
  // }

  const partners = (
      await new MaterialValue().where({ id: id }).save({ ...params }, { patch: true })
  ).serialize();

  return object.camelize(partners);
}
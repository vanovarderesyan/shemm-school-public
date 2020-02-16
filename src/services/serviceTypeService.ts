import ServiceType from '../models/ServiceType';
import logger from '../utils/logger';
import * as object from '../utils/object';

import transform from '../utils/transform';
import ServiceTypeDetail from '../domain/entities/ServiceTypeDetail';
import ServiceTypePayload from '../domain/requests/ServiceTypePayload';

/**
 * Fetch all users from users table.
 *
 * @returns {Promise<ServiceTypeDetail[]>}
 */
export async function fetchAll(): Promise<ServiceTypeDetail[]> {
  logger.log('info', 'Fetching users from database');

  const serviceTypes = await ServiceType.fetchAll();
  const res = transform(serviceTypes.serialize(), (serviceType: ServiceTypeDetail) => ({
    name: serviceType.name

    // updatedAt: new Date(user.updatedAt).toLocaleString(),
    // createdAt: new Date(user.updatedAt).toLocaleString()
  }));

  logger.log('debug', 'Fetched all users successfully:', res);

  return res;
}

/**
 * Insert user from given user payload
 *
 * @param {ServiceTypePayload} params
 * @returns {Promise<ServiceTypeDetail>}
 */
export async function insert(params: ServiceTypePayload): Promise<ServiceTypeDetail> {



    const serviceType = (await new ServiceType({ ...params}).save()).serialize();
  
    logger.log('debug', 'Inserted user successfully:', serviceType);
  
    return object.camelize(serviceType);
 
}

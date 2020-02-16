import ServiceName from '../models/ServiceName';
import logger from '../utils/logger';
import * as object from '../utils/object';

import transform from '../utils/transform';
import ServiceNameDetail from '../domain/entities/ServiceNameDetail';
import ServiceNamePayload from '../domain/requests/ServiceNamePayload';

/**
 * Fetch all users from users table.
 *
 * @returns {Promise<ServiceNameDetail[]>}
 */
export async function fetchAll(): Promise<ServiceNameDetail[]> {
  logger.log('info', 'Fetching users from database');

  const serviceNames = await ServiceName.fetchAll();
  const res = transform(serviceNames.serialize(), (serviceName: ServiceNameDetail) => ({
    code: serviceName.code,
    service_type_id : serviceName.service_type_id

    // updatedAt: new Date(user.updatedAt).toLocaleString(),
    // createdAt: new Date(user.updatedAt).toLocaleString()
  }));

  logger.log('debug', 'Fetched all users successfully:', res);

  return res;
}

/**
 * Insert user from given user payload
 *
 * @param {ServiceNamePayload} params
 * @returns {Promise<ServiceNameDetail>}
 */
export async function insert(params: ServiceNamePayload): Promise<ServiceNameDetail> {



    const serviceName = (await new ServiceName({ ...params}).save()).serialize();
  
    logger.log('debug', 'Inserted user successfully:', serviceName);
  
    return object.camelize(serviceName);
 
}

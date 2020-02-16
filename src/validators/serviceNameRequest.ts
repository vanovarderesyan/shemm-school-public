import Joi from 'joi';

export const seviceNamePOSTSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    code: Joi.string()
      .min(4)
      .max(100)
      .label('code')
      .required(),
    service_type_id: Joi.string()
      .min(4)
      .max(100)
      .label('service type id')
      .required(),
  });

import Joi from 'joi';

export const warehousePOSTSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
      name: Joi.string()
      .label('Name')
      .required(),
      code: Joi.number()
      .label('code')
      .required(),
      address: Joi.string()
      .label('address')
      .required(),
      responsible: Joi.string()
      .label('responsible')
      .required()
  });

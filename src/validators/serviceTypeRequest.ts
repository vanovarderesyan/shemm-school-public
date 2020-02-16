import Joi from 'joi';

export const seviceTypePOSTSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    name: Joi.string()
      .min(4)
      .max(100)
      .label('Name')
      .required(),
  });

import Joi from 'joi';

export const classificationPOSTSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    name: Joi.string()
      .min(4)
      .max(100)
      .label('Name')
      .required(),
      code : Joi.number()
        .min(1)
        .required(),
      type : Joi.string()
        .required()
  });

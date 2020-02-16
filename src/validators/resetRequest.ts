import Joi from 'joi';

export const resetPOSTSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    email: Joi.string()
      .min(4)
      .max(100)
      .label('Email')
      .required(),
  });

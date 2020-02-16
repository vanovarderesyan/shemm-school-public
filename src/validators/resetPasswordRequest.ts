import Joi from 'joi';

export const resetPasswordPOSTSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    token: Joi.string()
      .min(4)
      .label('Token')
      .required(),
    password : Joi.string()
    .min(4)
    .max(100)
    .label('Password')
    .required(),
  });

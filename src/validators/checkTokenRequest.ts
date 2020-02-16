import Joi from 'joi';

export const checkTokenPOSTSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    token: Joi.string()
      .min(4)
      .label('Token')
      .required(),
  });

import Joi from 'joi';

export const billingMethodPOSTSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    name: Joi.string()
      .min(4)
      .max(100)
      .label('Name')
      .required(),
      abbreviation:Joi.string()
      .required()
  });

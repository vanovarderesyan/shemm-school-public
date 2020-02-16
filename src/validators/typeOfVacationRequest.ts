import Joi from 'joi';

export const typeOfVacationPOSTSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    name: Joi.string()
      .min(2)
      .max(100)
      .label('Անուն')
      .required(),
      code: Joi.number()

  });

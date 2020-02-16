import Joi  from 'joi';

export const analiticGroup2POSTSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    name: Joi.string()
      .label('Name')
      .required(),
    code : Joi.number()
        .min(1)
        .required(),
    isAccumulate : Joi.boolean()
        .required()
        .allow(null),
    analiticGroup2Id : Joi.number()
        .min(1)
        .required()
        .allow(null)
    
  });

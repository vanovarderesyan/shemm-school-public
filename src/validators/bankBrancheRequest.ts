import Joi from 'joi';

export const bankBranchePOSTSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    branche_code: Joi.string()
      .min(4)
      .max(100)
      .label('Branche code')
      .required(),
    branche_address: Joi.string()
      .min(1)
      .max(100)
      .label('Branche address')
      .required(),
    bank_id: Joi.number()
      .min(1)
      .max(100)
      .label('Bank id')
      .required()
  });



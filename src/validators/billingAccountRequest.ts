import Joi from 'joi';

export const billingAccountPOSTSchema = Joi.object()
    .options({ abortEarly: false })
    .keys({
        name: Joi.string().required(),
        isMain: Joi.boolean().required(),
        account: Joi.string().required(),
        serialNumber: Joi.string().required(),
        partnersId : Joi.number().required()
    })
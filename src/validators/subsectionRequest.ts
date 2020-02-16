import Joi from 'joi';

export const subsectionPOSTSchema = Joi
    .object()
    .keys({
        name: Joi.string().required(),
        code : Joi.number().required(),
        customerAccountId : Joi.number().required(),
        prepaidAccountReceivedId : Joi.number().required(),
        aahAccountId : Joi.number().required(),
        typesOfActionsId : Joi.number().required()
    })
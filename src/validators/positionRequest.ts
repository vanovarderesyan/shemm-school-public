import Joi from 'joi';

export const positionPOSTSchema = Joi
    .object()
    .keys({
        name: Joi.string().required(),
        subdivisionId: Joi.number().required()
    })

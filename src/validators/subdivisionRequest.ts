import Joi from 'joi';

export const subdivisionPOSTSchema = Joi
    .object()
    .keys({
        name: Joi.string().required(),
    })
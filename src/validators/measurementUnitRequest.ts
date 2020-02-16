import Joi from 'joi';

export const measurementUnitPOSTSchema = Joi
    .object()
    .keys({
        code: Joi.string().required(),
        unit: Joi.string().required(),
        abbreviation: Joi.string().required()
    })
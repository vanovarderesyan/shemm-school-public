import Joi from 'joi';

export const paramValidationSchema = Joi
    .object()
    .keys({
        id: Joi.number().required().label('Id')
    })
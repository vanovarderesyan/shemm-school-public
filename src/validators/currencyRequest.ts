import Joi from 'joi';

export const currencyPOSTSchema = Joi.object()
    .options({ abortEarly: false })
    .keys({
        name: Joi.string()
            .label('Name')
            .required(),
        currency: Joi.string()
            .label('currency')
            .required(),
    });

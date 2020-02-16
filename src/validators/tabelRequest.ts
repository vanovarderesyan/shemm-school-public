import Joi from 'joi';

export const tabelPOSTSchema = Joi.object()
    .options({ abortEarly: false })
    .keys({
        name: Joi.string()
            .min(4)
            .max(100)
            .label('Name')
            .required(),
        hours: Joi.string()
            .min(1)
            .label('hours')
            .required(),
        year: Joi.string()
            .min(1)
            .label('year')
            .required(),
        months: Joi.string()
            .min(1)
            .label('months')
            .required(),
    });

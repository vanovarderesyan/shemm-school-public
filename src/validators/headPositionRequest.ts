import Joi from 'joi';

export const headPositionPOSTSchema = Joi.object()
    .options({ abortEarly: false })
    .keys({
        name: Joi.string()
            .min(2)
            .max(100)
            .label('name')
            .required(),

    });

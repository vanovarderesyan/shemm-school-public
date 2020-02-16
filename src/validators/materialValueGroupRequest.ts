import Joi from 'joi';

export const materialValueGroupPOSTSchema = Joi.object()
    .options({ abortEarly: false })
    .keys({
        name: Joi.string()
            .min(4)
            .max(100)
            .label('Name')
            .required(),
        code: Joi.number()
            .min(1)
            .required(),
            materialValueGroupId: Joi.number()
            .min(1)
            .allow(null)
    });

import Joi from 'joi';

export const paginatSchema = Joi.object()
    .options({ abortEarly: false })
    .keys({
        limit: Joi.number()
            .label('limit')
            .required(),
        offset: Joi.number()
            .label('offset')
            .required()
    });

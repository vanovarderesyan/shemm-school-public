import Joi from 'joi';

export const coWorkersPOSTSchema = Joi
    .object()
    .keys({
        code: Joi.string().required(),
        hvhh: Joi.string().required(),
        name: Joi.string().required(),
        creditor: Joi.string().required(),
        debetor: Joi.string().required(),
        legal_address: Joi.string().required(),
        work_address: Joi.string().required(),
        transfer_purpose: Joi.string().required(),
        inflow_account: Joi.string().required(),
        leakage_account: Joi.string().required(),
        director: Joi.string().required(),
        accountent: Joi.string().required(),
        bank_account: Joi.string().required(),
        bank_id: Joi.number().required()
    })
import Joi from 'joi';

export const accountOfEmplCalculationsPOSTSchema = Joi.object()
    .options({ abortEarly: false })
    .keys({
        name: Joi.string()
            .min(2)
            .max(100)
            .label('name')
            .required(),
        calculationsTypeId: Joi.string()
            .label('calculationsTypeId')
            .required(),
        acumulatedAccountId: Joi.string()
            .label('acumulatedAccountId')
            .allow(null)
            .required(),
        offBalanceSheet: Joi.boolean()
            .label('offBalanceSheet')
            .required(),
        accountingByPartners: Joi.boolean()
            .label('offBalanceSheet')
            .required(),
        analyticalGroup_1: Joi.boolean()
            .label('offBalanceSheet')
            .required(),
        analyticalGroup_2: Joi.boolean()
            .label('offBalanceSheet')
            .required(),
        isAccumulatedAccount: Joi.boolean()
            .label('isAccumulatedAccount')
            .required(),
        account: Joi.string()
            .label('account')
            .required(),
        currencies: Joi.array().items(Joi.object({
            currencyId: Joi.number().min(1),
            status : Joi.string()
        })).required()
    });